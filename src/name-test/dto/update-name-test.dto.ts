import { PartialType } from '@nestjs/mapped-types';
import { CreateNameTestDto } from './create-name-test.dto';

export class UpdateNameTestDto extends PartialType(CreateNameTestDto) {}
