import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { GetScheduleDto } from './dto/get-schedule';
import { Client } from './entities/client.entity';
import { Barber } from 'src/barbers/entities/barber.entity';
import { unixToDate } from 'src/utils/dates';

@Injectable()
export class ClientsService {
  private scheduleTimes = Array.from({ length: 13 }, (_, i) => i + 8);
  constructor(
    @InjectModel(Client.name)
    private readonly clientsModel: Model<Client>,
    @InjectModel(Barber.name)
    private readonly barberModel: Model<Barber>,
  ) { }
  async create(createClientDto: CreateClientDto) {
    const barber = await this.barberModel.findById(createClientDto.barberId);
    console.log({ barber });
    if (!barber) {
      throw new NotFoundException('Barber not found');
    }
    const overlap = await this.clientsModel.find({
      barberId: createClientDto.barberId,
      $or: [
        { startDate: createClientDto.startDate },
        { endDate: createClientDto.endDate },
        {
          startDate: { $lt: createClientDto.startDate },
          endDate: { $gt: createClientDto.startDate },
        },
        {
          startDate: { $lt: createClientDto.endDate },
          endDate: { $gt: createClientDto.endDate },
        },
      ],
      isDeleted: false,
    });
    if (overlap.length) {
      throw new NotFoundException('Schedule already exists');
    }

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
  async getSchedule(getScheduleDto: GetScheduleDto) {
    const schedules = await this.findAll(getScheduleDto);
    const times = schedules.map((schedule) =>
      unixToDate(+schedule.startDate).getHours(),
    );
    const avaibleTimes = this.scheduleTimes.filter(
      (time) => !times.includes(time),
    );
    return avaibleTimes;
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
