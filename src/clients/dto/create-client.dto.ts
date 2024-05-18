import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MinLength(4)
  clientName: string;

  @IsString()
  @MinLength(4)
  barberName: string;

  @IsNumber()
  @Min(10000)
  startDate: number;

  @IsNumber()
  @Min(10000)
  endDate: number;
}
