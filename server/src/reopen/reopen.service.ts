import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import doc from 'pdfkit';
import { CreateReopenDto } from 'src/dto/reopen/createReopen';
import { ENABLE_STATUS } from 'src/libs/status.libs';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { CashierSession } from 'src/schemas/cashierSession/cashierSession';
import { Reopen } from 'src/schemas/reopen/reopen.schema';
import { Table } from 'src/schemas/tables/tableSchema';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { Notes } from 'src/schemas/ventas/notes.schema';
enum ReopenType {
  HISTORY = 'history',
  CURRENT = 'current',
}

@Injectable()
export class ReopenService {
  constructor(
    @InjectModel(Reopen.name) private reopenModel: Model<Reopen>,
    @InjectModel(Bills.name) private billsModel: Model<Bills>,
    @InjectModel(Notes.name) private noteModel: Model<Notes>,
    @InjectModel(Table.name) private tableModel: Model<Table>,
    @InjectModel(CashierSession.name)
    private cashierSessionModel: Model<CashierSession>,
    private readonly operatingPeriodService: OperatingPeriodService,
  ) {}

  async findAll() {
    return await this.reopenModel
      .find()
      .populate({
        path: 'accountId',
      })
      .populate({
        path: 'userId',
      });
  }

  async findCurrent(id?: string | null, type?: string) {
    try {
      const currentPeriod = id
        ? await this.operatingPeriodService.getCurrent(id)
        : await this.operatingPeriodService.getCurrent();
      const currentPeriodId = currentPeriod[0]._id.toString();

      if (!currentPeriod) {
        throw new NotFoundException(
          'No se encontro ningun periodo actualmente',
        );
      }

      const docs = await this.reopenModel
        .find()
        .populate({
          path: 'accountId',
        })
        .populate({
          path: 'userId',
        });

      if (type === ReopenType.HISTORY) {
        return docs.filter(
          (doc) => doc.accountId.operatingPeriod.toString() !== currentPeriodId,
        );
      }

      if (type === ReopenType.CURRENT) {
        return docs.filter(
          (doc) => doc.accountId.operatingPeriod.toString() === currentPeriodId,
        );
      }
    } catch (error) {
      throw new NotFoundException('No se encuentran cuentas activas');
    }
  }

  async findOne(id: string) {
    return await this.reopenModel.findById(id);
  }

  async create(payload: CreateReopenDto) {
    const session = await this.reopenModel.startSession();
    await session.withTransaction(async () => {
      const reopen = new this.reopenModel(payload);
      await reopen.save();

      // cambiar el status de la cuenta de nuevo a enable
      const currentBill = await this.billsModel.findByIdAndUpdate(
        payload.accountId,
        { status: ENABLE_STATUS },
      );

      const currentTable = await this.tableModel.findByIdAndUpdate(
        currentBill.table,
        { status: ENABLE_STATUS },
      );

      await session.commitTransaction();
      session.endSession();
      return reopen;
    });
  }

  async createReopenNote(payload: CreateReopenDto) {
    const session = await this.reopenModel.startSession();
    await session.withTransaction(async () => {
      const reopen = new this.reopenModel(payload);
      await reopen.save();

      const currentNote = await this.noteModel.findByIdAndUpdate(
        payload.noteAccountId,
        { status: ENABLE_STATUS },
      );

      const currentBill = await this.billsModel.findByIdAndUpdate(
        payload.accountId,
        { status: ENABLE_STATUS },
      );

      const currentTable = await this.tableModel.findByIdAndUpdate(
        currentBill.table,
        { status: ENABLE_STATUS },
      );
      await session.commitTransaction();
      session.endSession();
      return reopen;
    });
  }

  async update(id: string, updatedReopen: CreateReopenDto) {
    return await this.reopenModel.findByIdAndUpdate(id, updatedReopen, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.reopenModel.findByIdAndDelete(id);
  }
}
