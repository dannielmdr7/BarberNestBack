import { IsMongoId, IsString, MinLength } from 'class-validator';

export class UpdateClientDto {
  @IsString()
  @MinLength(4)
  masterKey: string;

  @IsString()
  @IsMongoId()
  clientId: string;
}
