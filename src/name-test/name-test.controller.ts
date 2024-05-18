import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { NameTestService } from './name-test.service';
import { CreateNameTestDto } from './dto/create-name-test.dto';
import { UpdateNameTestDto } from './dto/update-name-test.dto';

@Controller('name-test')
export class NameTestController {
  constructor(private readonly nameTestService: NameTestService) { }

  @Post()
  create(@Body() createNameTestDto: CreateNameTestDto) {
    return this.nameTestService.create(createNameTestDto);
  }

  @Get()
  findAll() {
    return this.nameTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.nameTestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNameTestDto: UpdateNameTestDto) {
    return this.nameTestService.update(+id, updateNameTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nameTestService.remove(+id);
  }
}
