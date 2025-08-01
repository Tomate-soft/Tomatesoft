import { Module } from '@nestjs/common';
import { DailyRegisterService } from './daily-register.service';
import { DailyRegisterController } from './daily-register.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DailyRegister,
  DailyRegisterSchema,
} from 'src/schemas/dailyRegister/createDailyRegister';
import { User, UserSchema } from 'src/schemas/users.schema';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import { ProcessService } from 'src/process/process.service';
import { BillsService } from 'src/ventas/bills/bills.service';
import { Bills, BillSchema } from 'src/schemas/ventas/bills.schema';
import {
  ToGoOrder,
  ToGoOrderSchema,
} from 'src/schemas/ventas/orders/toGoOrder.schema';
import {
  RappiOrder,
  RappiOrderSchema,
} from 'src/schemas/ventas/orders/rappiOrder.schema';
import {
  PhoneOrder,
  PhoneOrderSchema,
} from 'src/schemas/ventas/orders/phoneOrder.schema';
import { Notes, NoteSchema } from 'src/schemas/ventas/notes.schema';
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';
import {
  SourcePeriod,
  SourcePeriodSchema,
} from 'src/schemas/SourcePeriod/sourcePeriod.schema';
import { DiscountsService } from 'src/ventas/discounts/discounts.service';
import { Discount, DiscountSchema } from 'src/schemas/ventas/discounts.schema';
import {
  CashierSession,
  CashierSessionSchema,
} from 'src/schemas/cashierSession/cashierSession';
import { CancellationsService } from 'src/ventas/cancellations/cancellations.service';
import {
  Cancellations,
  CancellationSchema,
} from 'src/schemas/ventas/cancellations.schema';
import { Product } from 'src/schemas/ventas/product.schema';
import { ProductSchema } from 'src/schemas/catalogo/products.schema';
import {
  MoneyMovement,
  MoneyMovementSchema,
} from 'src/schemas/moneyMovements/moneyMovement.schema';
import { SendMessagesService } from 'src/send-messages/send-messages.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DailyRegister.name,
        schema: DailyRegisterSchema,
      },
      {
        name: Branch.name,
        schema: BranchSchema,
      },
      {
        name: Bills.name,
        schema: BillSchema,
      },
      {
        name: RappiOrder.name,
        schema: RappiOrderSchema,
      },
      {
        name: PhoneOrder.name,
        schema: PhoneOrderSchema,
      },
      {
        name: Notes.name,
        schema: NoteSchema,
      },
      {
        name: ToGoOrder.name,
        schema: ToGoOrderSchema,
      },
      {
        name: Table.name,
        schema: TableSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: OperatingPeriod.name,
        schema: OperatingPeriodSchema,
      },
      {
        name: SourcePeriod.name,
        schema: SourcePeriodSchema,
      },
      {
        name: DailyRegister.name,
        schema: DailyRegisterSchema,
      },
      {
        name: Discount.name,
        schema: DiscountSchema,
      },
      {
        name: CashierSession.name,
        schema: CashierSessionSchema,
      },
      {
        name: Cancellations.name,
        schema: CancellationSchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: MoneyMovement.name,
        schema: MoneyMovementSchema,
      },
    ]),
  ],
  providers: [
    DailyRegisterService,
    OperatingPeriodService,
    ProcessService,
    BillsService,
    DiscountsService,
    CancellationsService,
    SendMessagesService,
  ],
  controllers: [DailyRegisterController],
})
export class DailyRegisterModule {}
