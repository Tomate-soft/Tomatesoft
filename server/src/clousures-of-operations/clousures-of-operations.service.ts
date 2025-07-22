import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { ReportsService } from 'src/reports/reports.service';
import { CashierSession } from 'src/schemas/cashierSession/cashierSession';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { PhoneOrder } from 'src/schemas/ventas/orders/phoneOrder.schema';
import { RappiOrder } from 'src/schemas/ventas/orders/rappiOrder.schema';
import { ToGoOrder } from 'src/schemas/ventas/orders/toGoOrder.schema';
import { calculateTotalByType } from './lib/calculateTotalByType';
import { UsersService } from 'src/users/users.service';
import {
  MoneyMovementStatus,
  MoneyMovementType,
} from 'src/dto/moneyMovements/moneyMovement.dto';

@Injectable()
export class ClousuresOfOperationsService {
  constructor(
    @InjectModel(OperatingPeriod.name)
    private operatingPeriodModel: Model<OperatingPeriod>,
    @InjectModel(CashierSession.name)
    private cashierSessionModel: Model<CashierSession>,
    private reportsService: ReportsService,
    private operatingPeriodService: OperatingPeriodService,
    @InjectModel(Bills.name) private billsModel: Model<Bills>,
    @InjectModel(ToGoOrder.name) private toGoOrderModel: Model<ToGoOrder>,
    @InjectModel(RappiOrder.name) private rappiOrderModel: Model<RappiOrder>,
    @InjectModel(PhoneOrder.name) private phoneOrderModel: Model<PhoneOrder>,
    private usersService: UsersService,
  ) {}

  async closePeriod(body: any) {
    const session = await this.operatingPeriodModel.startSession();
    session.startTransaction();
    try {
      const currentPeriod = await this.operatingPeriodService.getCurrent();
      if (!currentPeriod) {
        throw new NotFoundException(
          'No se encontro ningun periodo actualmente',
        );
      }
      // traeremos todas  las cuentas que matching con el periodo actual
      const bills = await this.billsModel
        .find({
          operatingPeriod: currentPeriod[0]._id,
        })
        .populate({
          path: 'payment',
          populate: {
            path: 'transactions',
          },
        });
      // traeremos todas las ordenes que matching con el periodo actual
      const toGoOrders = await this.toGoOrderModel
        .find({
          operatingPeriod: currentPeriod[0]._id,
        })
        .populate({
          path: 'payment',
          populate: {
            path: 'transactions',
          },
        });
      const rappiOrders = await this.rappiOrderModel
        .find({
          operatingPeriod: currentPeriod[0]._id,
        })
        .populate({
          path: 'payment',
          populate: {
            path: 'transactions',
          },
        });
      const phoneOrders = await this.phoneOrderModel
        .find({
          operatingPeriod: currentPeriod[0]._id,
        })
        .populate({
          path: 'payment',
          populate: {
            path: 'transactions',
          },
        });

      const allOrders = [
        ...bills,
        ...toGoOrders,
        ...rappiOrders,
        ...phoneOrders,
      ];
      session.endSession();
      return allOrders;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
    // return await this.operatingPeriodModel.find();
  }

  async closeCashierSession(body: any, auth: any) {
    const { employeeNumber } = auth;
    console.log(`y este es el perro body, ${body}`);
    console.log(`y este es el perro body, ${body.session}`);
    console.log(`y este es el perro body, ${body.session._id}`);

    const authUser =
      await this.usersService.findByEmployeeNumber(employeeNumber);
    const currentSession = await this.cashierSessionModel
      .findById(body.session)
      .populate({
        path: 'bills',
        populate: { path: 'payment' },
      })
      .populate({
        path: 'togoorders',
        populate: { path: 'payment' },
      })
      .populate({
        path: 'rappiOrders',
        populate: { path: 'payment' },
      })
      .populate({
        path: 'phoneOrders',
        populate: { path: 'payment' },
      })
      .populate({
        path: 'cashWithdraw',
      })
      .populate({ path: 'user' });

    // calculate cash diference
    const restaurantPayments = currentSession.bills.flatMap(
      (bill) => bill.payment,
    );

    const togoPayments = currentSession.togoorders.flatMap(
      (bill) => bill.payment,
    );

    const rappiPayments = currentSession.rappiOrders.flatMap(
      (bill) => bill.payment,
    );

    const phonePayments = currentSession.phoneOrders.flatMap(
      (bill) => bill.payment,
    );

    const concentratedPayments = [
      ...restaurantPayments,
      ...togoPayments,
      ...rappiPayments,
      ...phonePayments,
    ];

    const totalWithdraws = currentSession.cashWithdraw.reduce(
      (acc, current) => parseFloat(current.quantity) + acc,
      0,
    );

    const requestCash = concentratedPayments.flatMap(
      (payment) => payment.transactions,
    );

    const totalCash = calculateTotalByType(requestCash, 'cash');
    const totalDebit = calculateTotalByType(requestCash, 'debit');
    const totalCredit = calculateTotalByType(requestCash, 'credit');
    const totalTransfer = calculateTotalByType(requestCash, 'transfer');
    const totalQr = calculateTotalByType(requestCash, 'qrCode');
    const total =
      totalCash + totalDebit + totalCredit + totalTransfer + totalQr;

    // Summary totals
    // Summary cash    total de las ventas del efetivo -
    // aqui hay dos valores por que uno es el conteo y otro lo que se deberai de tener
    const summaryCash =
      parseFloat(totalCash) - parseFloat(body.cash ?? 0) - totalWithdraws;
    const summaryDebit = parseFloat(totalDebit) - parseFloat(body.debit ?? 0);
    const summaryCredit =
      parseFloat(totalCredit) - parseFloat(body.credit ?? 0);
    const summaryTransfer =
      parseFloat(totalTransfer) - parseFloat(body.transference ?? 0);

    const summaryTargets =
      totalDebit + totalCredit - (body.debit ?? 0 + body.credit ?? 0);

    const summaryQr = parseFloat(totalQr) - parseFloat(body.qr ?? 0);

    const countTotal =
      (isNaN(body.cash) ? 0 : parseFloat(body.cash)) +
      (isNaN(body.debit) ? 0 : parseFloat(body.debit)) +
      (isNaN(body.transference) ? 0 : parseFloat(body.transference)) +
      (isNaN(body.qr) ? 0 : parseFloat(body.qr));

    const newTotal = countTotal - total + totalWithdraws;
    console.log(`countTotal: ${countTotal}`);
    console.log(`total: ${total}`);
    console.log(`totalWithdraws: ${totalWithdraws}`);
    console.log(`newTotal: ${newTotal}`);

    const summaryTotal =
      summaryCash +
      summaryDebit +
      summaryCredit +
      summaryTransfer +
      summaryQr -
      parseFloat(
        body.totalAmount ??
          parseFloat(body.cash ?? 0) +
            parseFloat(body.debit ?? 0) +
            parseFloat(body.credit ?? 0) +
            parseFloat(body.transference ?? 0) +
            parseFloat(body.qr ?? 0),
      ) -
      totalWithdraws;
    console.log(`summaryTotal: ${summaryTotal}`);
    console.log(total - countTotal - totalWithdraws);

    // const summaryRappi = parseFloat(totalRappi ?? 0) - parseFloat(body.rappi ?? 0); // esto habra que filtrar por tipo de venta|
    // const summaryUberEats = parseFloat(totalUberEats ?? 0) - parseFloat(body.uberEats ?? 0); // esto habra que filtrar por tipo de venta|
    // const summaryDidiFood = parseFloat(totalDidiFood ?? 0) - parseFloat(body.didiFood ?? 0); // esto habra que filtrar por tipo de venta|
    // new deployed version
    // summary deployed
    /*
    const summaryTotal =
      parseFloat(total) -
      (parseFloat(body?.cash ?? 0) +
        parseFloat(body?.debit ?? 0) +
        parseFloat(body?.credit ?? 0) +
        parseFloat(body?.transfer ?? 0) +
        parseFloat(body?.rappi ?? 0) +
        parseFloat(body?.uberEats ?? 0) +
        parseFloat(body?.didiFood ?? 0));
        */

    /* 
    const requestDebit = arrayDeTransacciones.filter((payment) => payment.type === 'debit');
    const requestCredit = arrayDeTransacciones.filter((payment) => payment.type === 'credit');
    const requestTransfer = arrayDeTransacciones.filter((payment) => payment.type === 'transfer');

    tmb debemos sumar los totales que nos interesan para el reporte
    // saldo total en tarjeta
    // saldo todal cobrado que es total de efectivo + total de tarjeta + cualquier otroa ingreso disponible
    // saldo total a requerir que es total de efectivo menos el total de efectivo que se tiene en caja menos salidas de efectivo que se hayan hecho.

    // por ultimo agreguemos datos relevantes de venta
    // cuantas cuentas se atendieron
      // cuantas cuentas canceladas
    const canceledAccounts = currentSession.bills.filter((bill) => bill.status === 'calcel') o algo asi

    // Descuentos echos a cuenta
    // Descuentos echos a notas
    // Descuentos echos a productos
    // cortesias echas a cuenta
    // cortesias echas a notas
    // cortesias echas a productos
    // total de los descuentos en dinero
    // total de las cortesias en dinero
    // por ultimo el resultado de la operacion de caja, es decir si hace falta o sobra dinero en caja.

    // hay que recuperar tmb datos del encabezado
    // como la fecha
    // el nombre dle cajero
    // Folio de corte

  */
    // Esto es de lo que mandamos desde el front
    const totalTargetsAmount = parseFloat(body.debit) + parseFloat(body.credit);
    const totalTranferencesAmount = parseFloat(body.transference);
    const totalQrAmount = parseFloat(body.qr);

    // por aca falta el tema de los pagos por medio de QR

    const dataForPrint = {
      ...body,
      cashWithdraws: currentSession.cashWithdraw,
      totalWithdraws: totalWithdraws,
      totalCash: total,
      cashAmount: totalCash,
      debitAmount: totalDebit,
      creditAmount: totalCredit,
      qrAmount: totalQr,
      targetsAmount: totalDebit + totalCredit,
      transferencesAmount: totalTransfer, // Aca sujmaremos rappi , uber y todo lo que venga de transferencias aunque sean de otro tipo de venta.
      transferAmount: totalTransfer,
      totalTargetsAmount: totalTargetsAmount,
      totalTranferencesAmount: totalTranferencesAmount,
      totalQrAmount: totalQrAmount,
      rappiAmount: 0,
      uberEatsAmount: 0,
      didiFoodAmount: 0,
      totalAmount: total,
      summaryTargets: summaryTargets,
      summaryTransferences: summaryTransfer,
      summaryCash: summaryCash,
      summaryDebit: summaryDebit,
      summaryCredit: summaryCredit,
      summaryTransfer: summaryTransfer,
      summaryQr: summaryQr,
      summaryRappi: '$0.00',
      summaryUberEats: '0.00',
      summaryDidiFood: '0.00',
      summaryTotal: newTotal,
      authFor: authUser.name
        ? `${authUser.name} ${authUser.lastName}`
        : 'No encontrado',
    };
    // console.log(dataForPrint);

    // const report = await this.reportsService.closeCashierSession(dataForPrint);
    // hayq ue importar para crear el nuevo moneyMovemente
    // lo c reamos con la informacion que haga falta y el monto del efectiuvo que se tienen en la caja.

    const descriptiveMessage =
      '---\n\n' +
      `El cierre de caja del día ha finalizado exitosamente. Esta operación, realizada por el usuario con el número de empleado ${currentSession.user.employeeNumber} y autorizada por ${dataForPrint.authFor}, consolida y verifica la totalidad de los movimientos financieros.\n\n` +
      `El total general de ventas registradas asciende a $${dataForPrint.totalAmount}. De este monto, $${dataForPrint.cashAmount} corresponde a efectivo contado, cuyo resumen es ${dataForPrint.summaryCash}. Las ventas mediante tarjetas suman $${dataForPrint.targetsAmount.toFixed(2)}, desglosadas en $${dataForPrint.creditAmount.toFixed(2)} (${dataForPrint.summaryCredit}) en crédito y $${dataForPrint.debitAmount.toFixed(2)} (${dataForPrint.summaryDebit}) en débito.\n\n` +
      `Las ventas y otros ingresos por transferencias y plataformas alcanzan los $${dataForPrint.transferencesAmount}. Esto incluye $${dataForPrint.transferAmount} (${dataForPrint.summaryTransfer}) por transferencias bancarias, y un desglose de $${dataForPrint.rappiAmount.toFixed(2)} (${dataForPrint.summaryRappi}) de Rappi, $${dataForPrint.uberEatsAmount.toFixed(2)} (${dataForPrint.summaryUberEats}) de Uber Eats, y $${dataForPrint.didiFoodAmount.toFixed(2)} (${dataForPrint.summaryDidiFood}) de Didi Food.\n\n` +
      `Se registraron retiros de efectivo (cash withdraws) por un total de $${dataForPrint.cashWithdraws}, sumando un total de retiros registrados de $${dataForPrint.totalWithdraws}.\n\n` +
      `Finalmente, el monto total de efectivo a ingresar a caja chica producto de este cierre es de $${summaryCash}, consolidándose como un ingreso y confirmando la precisión e integridad de los registros financieros del día.\n\n` +
      '---';

    const movementData = {
      amount: parseFloat(body.cash), // es el total de efectivo por que es lo que va entrar a caja chica
      type: MoneyMovementType.INCOME,
      title: `Cierre de caja - ${currentSession.user.employeeNumber}`,
      description: descriptiveMessage,
      date: new Date().toLocaleDateString(),
      user: authUser.name
        ? `${authUser.name} ${authUser.lastName}`
        : 'No encontrado',
      status: MoneyMovementStatus.APPROVED,
    };

    // aca la data de moneyMovemenet
    // updtae

    await this.operatingPeriodService.createMoneyMovement(movementData);

    return dataForPrint;
  }
}
