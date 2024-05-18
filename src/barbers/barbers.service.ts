import { Injectable } from '@nestjs/common';
import { CreateBarberDto } from './dto/create-barber.dto';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Barber } from './entities/barber.entity';
import { Model } from 'mongoose';

@Injectable()
export class BarbersService {
  constructor(
    @InjectModel(Barber.name)
    private readonly barberModel: Model<Barber>,
  ) { }
  async create(createBarberDto: CreateBarberDto) {
    const barber = await this.barberModel.create(createBarberDto);
    return barber;
  }

  async findAll() {
    const barbers = await this.barberModel.find();
    return barbers;
  }
}
