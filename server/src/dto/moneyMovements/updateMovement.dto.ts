import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

enum MoneyMovementStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

enum MoneyMovementType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export class UpdateMoneyMovementDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsEnum(MoneyMovementType)
  type?: MoneyMovementType;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  user?: string;

  @IsOptional()
  @IsEnum(MoneyMovementStatus)
  status?: MoneyMovementStatus;
}
