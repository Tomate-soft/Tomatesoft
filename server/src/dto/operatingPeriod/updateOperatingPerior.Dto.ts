import { IsOptional } from 'class-validator';
import { CheckInRegister } from 'src/schemas/operatingPeriod/operatingPeriod.schema';

export class updateOperatingPeriodDto {
  @IsOptional()
  status: boolean;

  @IsOptional()
  dailyRegisters: string[];

  @IsOptional()
  sellProcess: string[];

  @IsOptional()
  withdrawals: string;

  @IsOptional()
  registers: CheckInRegister[];
}
// Compare this snippet from src/dto/catalogo/products/createProduct.dto.ts:
// import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
