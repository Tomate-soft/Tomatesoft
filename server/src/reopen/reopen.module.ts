import { Module } from '@nestjs/common';
import { ReopenController } from './reopen.controller';
import { ReopenService } from './reopen.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reopen, ReopenSchema } from 'src/schemas/reopen/reopen.schema';
import { Bills, BillSchema } from 'src/schemas/ventas/bills.schema';
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';
import {
  CashierSession,
  CashierSessionSchema,
} from 'src/schemas/cashierSession/cashierSession';
import { Notes, NoteSchema } from 'src/schemas/ventas/notes.schema';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import {
  SourcePeriod,
  SourcePeriodSchema,
} from 'src/schemas/SourcePeriod/sourcePeriod.schema';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { Branch, BranchSchema } from 'src/schemas/business/branchSchema';
import { ProcessService } from 'src/process/process.service';
import { BillsService } from 'src/ventas/bills/bills.service';
import { Discount, DiscountSchema } from 'src/schemas/ventas/discounts.schema';
import { DiscountsService } from 'src/ventas/discounts/discounts.service';
import { Cancellations, CancellationSchema } from 'src/schemas/ventas/cancellations.schema';
import { CancellationsService } from 'src/ventas/cancellations/cancellations.service';
import { ToGoOrder, ToGoOrderSchema } from 'src/schemas/ventas/orders/toGoOrder.schema';
import { RappiOrder, RappiOrderSchema } from 'src/schemas/ventas/orders/rappiOrder.schema';
import { PhoneOrder, PhoneOrderSchema } from 'src/schemas/ventas/orders/phoneOrder.schema';
import { User, UserSchema } from 'src/schemas/users.schema';
import { Product } from 'src/schemas/ventas/product.schema';
import { ProductSchema } from 'src/schemas/catalogo/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reopen.name, schema: ReopenSchema },
      { name: Bills.name, schema: BillSchema },
      { name: Notes.name, schema: NoteSchema },
      { name: Table.name, schema: TableSchema },
      { name: CashierSession.name, schema: CashierSessionSchema },
      { name: SourcePeriod.name, schema: SourcePeriodSchema },
      { name: OperatingPeriod.name, schema: OperatingPeriodSchema },
      { name: Branch.name, schema: BranchSchema },
      { name: Discount.name, schema: DiscountSchema },
      { name: Cancellations.name, schema: CancellationSchema },
      { name: ToGoOrder.name, schema: ToGoOrderSchema },
      { name: RappiOrder.name, schema: RappiOrderSchema },
      { name: PhoneOrder.name, schema: PhoneOrderSchema },
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [ReopenController],
  providers: [
    ReopenService,
    OperatingPeriodService,
    ProcessService,
    BillsService,
    DiscountsService,
    CancellationsService,
  ],
})
export class ReopenModule {}
