import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';

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
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  type: MoneyMovementType;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  status: MoneyMovementStatus;
}

export const MoneyMovementSchema = SchemaFactory.createForClass(MoneyMovement);
