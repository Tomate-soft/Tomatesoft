import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { OperatingPeriod } from '../operatingPeriod/operatingPeriod.schema';

enum MoneyMovementStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

enum MoneyMovementType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Schema({ versionKey: false, timestamps: true })
export class MoneyMovement {
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'OperatingPeriod',
  })
  operatingPeriod?: OperatingPeriod;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: MoneyMovementType })
  type: MoneyMovementType;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true, enum: MoneyMovementStatus })
  status: MoneyMovementStatus;
}

export const MoneyMovementSchema = SchemaFactory.createForClass(MoneyMovement);
