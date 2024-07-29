import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { GetScheduleDto } from './dto/get-schedule';
import { Client } from './entities/client.entity';
import { Barber } from 'src/barbers/entities/barber.entity';

import * as moment from 'moment-timezone';

@Injectable()
export class ClientsService {
  private scheduleTimes = Array.from({ length: 11 }, (_, i) => i + 10);
  constructor(
    @InjectModel(Client.name)
    private readonly clientsModel: Model<Client>,
    @InjectModel(Barber.name)
    private readonly barberModel: Model<Barber>,
  ) { }
  async create(createClientDto: CreateClientDto) {
    const barber = await this.barberModel.findById(createClientDto.barberId);
    if (!barber) {
      throw new NotFoundException('Barber not found');
    }
    // const overlap = await this.clientsModel.find({
    //   barberId: createClientDto.barberId,
    //   $or: [
    //     { startDate: createClientDto.startDate },
    //     { endDate: createClientDto.endDate },
    //     {
    //       startDate: { $lt: createClientDto.endDate },
    //       endDate: { $gt: createClientDto.startDate },
    //     },
    //   ],
    //   isDeleted: false,
    // });
    // if (overlap.length) {
    //   throw new NotFoundException('Schedule already exists');
    // }
    const date = createClientDto.turnDate;
    const startHour = createClientDto.startHour;
    const startDateTime = moment.tz(
      `${date} ${startHour}`,
      'YYYY-MM-DD HH:mm',
      'America/Bogota',
    );
    const endDateTime = moment.tz(
      `${date} ${+startHour + 1}`,
      'YYYY-MM-DD HH:mm',
      'America/Bogota',
    );
    const unixStartDate = startDateTime.unix();
    const unixEndDate = endDateTime.unix();

    const unAvaibleTurn = await this.clientsModel.findOne({
      startDate: unixStartDate,
      endDate: unixEndDate,
    });
    if (unAvaibleTurn) {
      throw new BadRequestException('Schedule already exists');
    }

    const client = await this.clientsModel.create({
      ...createClientDto,
      startDate: unixStartDate,
      endDate: unixEndDate,
    });
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

    const times = schedules.map((schedule) => +schedule.startDate);
    const hours = times.map((time) => {
      const hour = moment(time * 1000)
        .tz('America/Bogota')
        .hour();
      return hour;
    });
    const avaibleTimes = this.scheduleTimes.filter(
      (time) => !hours.includes(time),
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
