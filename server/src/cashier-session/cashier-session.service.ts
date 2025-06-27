import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { parse } from 'path';
import { title } from 'process';
import { createCashWithdrawDto } from 'src/dto/cashierSession/cashWithdraw/createCashWithdraw';

import { createCashierSessionDto } from 'src/dto/cashierSession/createCashierSession';
import { updateCashierSessionDto } from 'src/dto/cashierSession/updateCashierSession';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { CashWithdraw } from 'src/schemas/cashierSession/cashWithdraw';
import { CashierSession } from 'src/schemas/cashierSession/cashierSession';
import { MoneyMovement } from 'src/schemas/moneyMovements/moneyMovement.schema';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class CashierSessionService {
  constructor(
    @InjectModel(CashierSession.name)
    private cashierSessionModel: Model<CashierSession>,
    @InjectModel(OperatingPeriod.name)
    private readonly operatingPeriodModel: Model<OperatingPeriod>,
    private readonly operatingPeriodService: OperatingPeriodService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(CashWithdraw.name)
    private readonly cashWithdrawModel: Model<CashWithdraw>,
    @InjectModel(MoneyMovement.name)
    private readonly moneyMovementModel: Model<MoneyMovement>,
  ) {}

  async findAll() {
    return await this.cashierSessionModel
      .find()
      .populate({ path: 'bills', populate: [{ path: 'notes' }] })
      .populate({
        path: 'user',
      });
  }

  async findOne(id: string) {
    return await this.cashierSessionModel.findById(id);
  }

  async delete(id: string) {
    return await this.cashierSessionModel.findByIdAndDelete(id);
  }

  async create(body: createCashierSessionDto) {
    const data = { ...body, startDate: new Date().toISOString() };

    // Crear nueva sesión de cajero
    const newSession = new this.cashierSessionModel(data);
    await newSession.save();

    // Obtener el último documento de operatingPeriodModel
    const updatedOperatingPeriod = await this.operatingPeriodModel
      .findOne()
      .sort({ _id: -1 });

    if (updatedOperatingPeriod && newSession._id) {
      const sellProcess = [...updatedOperatingPeriod.sellProcess, newSession];

      // Actualizar operatingPeriodModel con la nueva sesión si existe
      await this.operatingPeriodModel.findByIdAndUpdate(
        updatedOperatingPeriod._id,
        { sellProcess },
        { new: true }, // Devuelve el documento actualizado
      );
    }
    let cashierName = '';

    if (newSession._id) {
      try {
        const updatedUser = await this.userModel.findByIdAndUpdate(
          body.user,
          { cashierSession: newSession._id },
          { new: true },
        );
        cashierName = ` ${updatedUser.employeeNumber} ${updatedUser.name} ${updatedUser.lastName}`;
      } catch (error) {
        throw new NotFoundException(
          'No se completo la actualizacion de usuario',
        );
      }
    } //
    const periodDate = new Date(updatedOperatingPeriod.createdAt).toISOString();

    // Se retorna la nueva sesión creada
    return {
      ...newSession.toObject(),
      periodDate,
      cashierName,
    };
  }

  async update(id: string, body: updateCashierSessionDto) {
    return await this.cashierSessionModel.findByIdAndUpdate(id, body, {
      new: true,
    });
  }

  async updateBillForPayment(id: string, body: updateCashierSessionDto) {
    const session = await this.cashierSessionModel.startSession();
    session.startTransaction();
    try {
      const currentSession = await this.cashierSessionModel.findById(id);

      if (!currentSession) {
        throw new NotFoundException('No se pudo actualizar');
      }
      const res = await this.cashierSessionModel.findByIdAndUpdate(
        id,
        {
          bills: [
            ...new Set([
              ...currentSession.bills.map((bill: any) => bill.toString()),
              ...body.bills,
            ]),
          ],
        },
        { new: true },
      );

      /*
        if (!currentSession.bills.includes(body.bills)) {
        const res = await this.cashierSessionModel.findByIdAndUpdate(
          id,
          { bills: [...currentSession.bills].concat(body.bills) },
          {
            new: true,
          },
        );
      }
      */
      await session.commitTransaction();
      session.endSession();
      return res;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(
        `Hubo un error inesperado surante la sesion, mas informacion: ${error}`,
      );
    }
  }
  // ver si hay dinero para realizar el retiro
  // ya que creamos el retiro lo metemos a la session del cajero
  async cashWithdrawal(body: { auth: any; body: createCashWithdrawDto }) {
    console.log('body', body);
    const bodyData = body.body;
    const session = await this.cashierSessionModel.startSession();
    const newWithdraw = await session.withTransaction(async () => {
      const currentPeriod = await this.operatingPeriodService.getCurrent();
      // const currentSession = await this.cashierSessionModel.findById(
      //   body.sessionId,
      // );
      const newWithdraw = new this.cashWithdrawModel(bodyData);
      await newWithdraw.save();

      const currentSession = await this.cashierSessionModel.findByIdAndUpdate(
        bodyData.sessionId,
        { $push: { cashWithdraws: newWithdraw._id } },
        {
          new: true,
        },
      );

      // Que informacion necesito para crear el MoneyMovement?
      // que aqui obviamente siempre es por defecto un retiro de efectivo.
      // la info0rmaciopn que se necewsita es la siguiente:
      /*
      amount: este yua lo tenemos que tener por que viene para crear el cashWithdraw
      type: este es un retiro de efectivo, por lo que siempre sera Income este dinero sale de la caja pero entra al operatingPeriod
      description: Aca meteremos un string como: Retiro de efectivo efectuado a el cajero ${userName}, aprovado por ${quien aprueba} en la fecha ${new Date().toISOString()}
      date: este es el momento en que se realiza el retiro, por lo que sera new Date().toISOString()
      user: este es el usuario que realiza el retiro, por lo que sera body.user
      status: siempre sera aprobado, ya que el retiro se realiza en el momento y no hay aprobacion previa. o esta aprobacion se corrobora en el POS
      */
      const userName = `${currentSession.user.name} ${currentSession.user.lastName}`;
      const movementData = {
        operatingPeriod: currentPeriod[0]?._id, // ✅
        amount: parseFloat(bodyData.quantity), // ✅
        type: 'income', // ✅
        title: 'Retiro parcial de efectivo', // ✅
        description: `Retiro de efectivo efectuado a el cajero ${currentSession.user.name}, aprovado por ${body.auth.pin} en la fecha ${new Date().toISOString()}`,
        date: new Date().toISOString(),
        user: userName,
        status: 'approved',
      };
      // podemos aqui ademas crear un moneyMovement
      const newMovement = new this.moneyMovementModel(movementData);
      await newMovement.save();
      // y el moneyMovement lo metemos al operatingPeriod
      const periodUpdated = await this.operatingPeriodModel.findByIdAndUpdate(
        currentPeriod[0]?._id,
        {
          $push: { moneyMovements: newMovement._id },
        },
      );

      if (!periodUpdated) {
        throw new NotFoundException(
          'No se completo la actualizacion de usuario',
        );
      }
      await session.commitTransaction();
      session.endSession();
      return newWithdraw;
    });
    return newWithdraw;
  }

  async pauseResume(id: string) {
    const session = await this.cashierSessionModel.startSession();
    session.startTransaction();
    try {
      const currentSession = await this.cashierSessionModel.findById(id);
      if (!currentSession) {
        throw new NotFoundException('No se pudo actualizar');
      }
      const res = await this.cashierSessionModel.findByIdAndUpdate(
        id,
        { enable: currentSession.enable === true ? false : true },
        {
          new: true,
        },
      );
      await session.commitTransaction();
      session.endSession();
      return res;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(
        `Hubo un error inesperado surante la sesion, mas informacion: ${error}`,
      );
    }
  }
}
