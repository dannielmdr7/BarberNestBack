import { IsString, MinLength } from 'class-validator';

export class CreateNameTestDto {
  @IsString()
  @MinLength(1)
  name: string;
}
