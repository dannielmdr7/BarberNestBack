import { Transform } from 'class-transformer';
import { IsMongoId, IsNumber, Min } from 'class-validator';

export class GetScheduleDto {
  @IsMongoId()
  barberId: string;

  @IsNumber()
  @Min(10000)
  @Transform(({ value }) => Number(value))
  startDate: number;

  @IsNumber()
  @Min(10000)
  @Transform(({ value }) => Number(value))
  endDate: number;
}
