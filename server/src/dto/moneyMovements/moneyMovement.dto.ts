import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
} from 'class-validator';

export enum MoneyMovementStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

export enum MoneyMovementType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export class CreateMoneyMovementDto {
  @IsNumber()
  amount: number;

  @IsEnum(MoneyMovementType)
  type: MoneyMovementType;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  date: Date;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsEnum(MoneyMovementStatus)
  status: MoneyMovementStatus;
}
