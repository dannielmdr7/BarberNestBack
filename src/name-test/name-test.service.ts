import { Injectable } from '@nestjs/common';
import { CreateNameTestDto } from './dto/create-name-test.dto';
import { UpdateNameTestDto } from './dto/update-name-test.dto';
import { InjectModel } from '@nestjs/mongoose';
import { NameTest } from './entities/name-test.entity';
import { Model } from 'mongoose';

@Injectable()
export class NameTestService {
  constructor(
    @InjectModel(NameTest.name)
    private readonly nameTestModel: Model<NameTest>,
  ) { }
  async create(createNameTestDto: CreateNameTestDto) {
    const user = await this.nameTestModel.create(createNameTestDto);
    return user;
  }

  findAll() {
    return `This action returns all nameTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nameTest`;
  }

  update(id: number, updateNameTestDto: UpdateNameTestDto) {
    return `This action updates a #${id} nameTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} nameTest`;
  }
}
