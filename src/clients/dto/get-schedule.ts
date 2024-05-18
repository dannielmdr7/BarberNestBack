import { IsMongoId, IsNumber, Min } from 'class-validator';

export class GetScheduleDto {
  @IsMongoId()
  barberId: string;

  @IsNumber()
  @Min(10000)
  startDate: number;

  @IsNumber()
  @Min(10000)
  endDate: number;
}
