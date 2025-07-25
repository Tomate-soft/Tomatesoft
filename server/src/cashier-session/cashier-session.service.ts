import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  // En tu servicio (cashier-session.service.ts)

  async cashWithdrawal(body: { auth: any; body: createCashWithdrawDto }) {
    const bodyData = body.body;
    const session = await this.cashierSessionModel.startSession();

    try {
      // Moví el try/catch para envolver todo el flujo de la transacción
      const result = await session.withTransaction(async () => {
        const currentPeriod = await this.operatingPeriodService.getCurrent();

        const newWithdraw = new this.cashWithdrawModel(bodyData);
        await newWithdraw.save({ session }); // Pasa la sesión a la operación de guardar

        const currentSession = await this.cashierSessionModel
          .findByIdAndUpdate(
            bodyData.sessionId,
            { $push: { cashWithdraw: newWithdraw._id } },
            {
              new: true,
              session, // Pasa la sesión a findByIdAndUpdate
            },
          )
          .populate({ path: 'user' });

        if (!currentSession) {
          throw new NotFoundException(
            'No se pudo actualizar la sesión del cajero.',
          );
        }

        const userBy = await this.userModel
          .find({
            employeeNumber: body.auth.pin,
          })
          .session(session); // Pasa la sesión a find

        if (!userBy || userBy.length === 0) {
          throw new NotFoundException(
            'Usuario aprobador no encontrado por PIN.',
          );
        }

        const userName = `${userBy[0].name} ${userBy[0].lastName}`;
        const movementData = {
          operatingPeriod: currentPeriod[0]?._id,
          amount: parseFloat(bodyData.quantity),
          type: 'income',
          title: 'Retiro parcial de efectivo',
          description: `Retiro de efectivo efectuado al cajero ${currentSession.user.name}, aprobado por ${userName} en la fecha ${new Date().toLocaleDateString('es-MX')}`,
          date: new Date().toISOString(),
          user: userName,
          status: 'approved',
        };

        const newMovement = new this.moneyMovementModel(movementData);
        await newMovement.save({ session }); // Pasa la sesión a la operación de guardar

        const periodUpdated = await this.operatingPeriodModel.findByIdAndUpdate(
          currentPeriod[0]?._id,
          {
            $push: { moneyMovements: newMovement._id },
          },
          { session }, // Pasa la sesión a findByIdAndUpdate
        );

        if (!periodUpdated) {
          throw new NotFoundException(
            'No se completó la actualización del período operativo.',
          );
        }

        // Este es el objeto que será devuelto por la transacción
        return {
          user: `${currentSession.user.name} ${currentSession.user.lastName}`,
          // Quizás quieras devolver también los detalles de newWithdraw o newMovement
          // newWithdrawalId: newWithdraw._id,
          // movementId: newMovement._id,
        };
      });

      // session.commitTransaction() y session.endSession() son manejados implícitamente por session.withTransaction()
      // si la función de callback se resuelve exitosamente. Si ocurre un error, aborta y termina.

      return result; // Devuelve el resultado de la transacción
    } catch (error) {
      // Si ocurre un error, session.withTransaction() automáticamente abortará y terminará la sesión.
      console.error(
        `Hubo un error inesperado durante la sesión de retiro de efectivo: ${error}`,
      );
      // Re-lanza el error para que NestJS pueda capturarlo y enviar una respuesta HTTP adecuada
      throw error;
    } finally {
      // Asegura que la sesión siempre termine, incluso si ocurre un error inesperado
      if (session.inTransaction()) {
        await session.abortTransaction(); // Debería ser manejado por withTransaction, pero como salvaguarda
      }
      await session.endSession();
    }
  }
  // ver si hay dinero para realizar el retiro
  // ya que creamos el retiro lo metemos a la session del cajero
  // async cashWithdrawal(body: { auth: any; body: createCashWithdrawDto }) {
  //   const bodyData = body.body;
  //   const session = await this.cashierSessionModel.startSession();
  //   const newWithdraw = await session.withTransaction(async () => {
  //     const currentPeriod = await this.operatingPeriodService.getCurrent();
  //     // const currentSession = await this.cashierSessionModel.findById(
  //     //   body.sessionId,
  //     // );
  //     const newWithdraw = new this.cashWithdrawModel(bodyData);
  //     await newWithdraw.save();

  //     const currentSession = await this.cashierSessionModel
  //       .findByIdAndUpdate(
  //         bodyData.sessionId,
  //         { $push: { cashWithdraw: newWithdraw._id } },
  //         {
  //           new: true,
  //         },
  //       )
  //       .populate({ path: 'user' });

  //     console.log(currentSession);
  //     if (!currentSession) {
  //       throw new NotFoundException('No se pudo actualizar');
  //     }

  //     const userBy = await this.userModel.find({
  //       employeeNumber: body.auth.pin,
  //     });

  //     const userName = `${userBy[0].name} ${userBy[0].lastName}`;
  //     const movementData = {
  //       operatingPeriod: currentPeriod[0]?._id, // ✅
  //       amount: parseFloat(bodyData.quantity), // ✅
  //       type: 'income', // ✅
  //       title: 'Retiro parcial de efectivo', // ✅
  //       description: `Retiro de efectivo efectuado a el cajero ${currentSession.user.name}, aprovado por ${userName} en la fecha ${new Date().toLocaleDateString()}`,
  //       date: new Date().toISOString(),
  //       user: userName,
  //       status: 'approved',
  //     };
  //     // podemos aqui ademas crear un moneyMovement
  //     const newMovement = new this.moneyMovementModel(movementData);
  //     await newMovement.save();
  //     // y el moneyMovement lo metemos al operatingPeriod
  //     const periodUpdated = await this.operatingPeriodModel.findByIdAndUpdate(
  //       currentPeriod[0]?._id,
  //       {
  //         $push: { moneyMovements: newMovement._id },
  //       },
  //     );

  //     if (!periodUpdated) {
  //       throw new NotFoundException(
  //         'No se completo la actualizacion de usuario',
  //       );
  //     }
  //     await session.commitTransaction();
  //     session.endSession();
  //     return {
  //       user: `${currentSession.user.name} ${currentSession.user.lastName}`,
  //     };
  //   });
  //   return newWithdraw;
  // }

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
