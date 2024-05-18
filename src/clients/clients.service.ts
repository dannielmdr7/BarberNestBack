import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { GetScheduleDto } from './dto/get-schedule';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientsModel: Model<Client>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const client = await this.clientsModel.create(createClientDto);
    return client;
  }

  async findAll(getScheduleDto: GetScheduleDto) {
    const schedule = await this.clientsModel.find({
      barberId: getScheduleDto.barberId,
      isDeleted: false,
      startDate: {
        $gte: getScheduleDto.startDate,
        $lte: getScheduleDto.endDate,
      },
    });

    return schedule;
  }

  async update(id: string) {
    const updatedInfo = await this.clientsModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    return updatedInfo;
  }
}
