import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { GetScheduleDto } from './dto/get-schedule';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  findAll(@Query() getScheduleDto: GetScheduleDto) {
    return this.clientsService.findAll(getScheduleDto);
  }

  @Get('/schedule')
  getSchedule(@Query() getScheduleDto: GetScheduleDto) {
    return this.clientsService.getSchedule(getScheduleDto);
  }

  @Patch()
  update(@Body() deleteUser: UpdateClientDto) {
    return this.clientsService.update(deleteUser);
  }
}
