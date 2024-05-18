import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { GetScheduleDto } from './dto/get-schedule';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  findAll(@Body() getScheduleDto: GetScheduleDto) {
    return this.clientsService.findAll(getScheduleDto);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.clientsService.update(id);
  }
}
