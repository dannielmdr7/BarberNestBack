import { Module } from '@nestjs/common';
import { NameTestService } from './name-test.service';
import { NameTestController } from './name-test.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NameTest, NameTestSchema } from './entities/name-test.entity';

@Module({
  controllers: [NameTestController],
  providers: [NameTestService],
  imports: [
    MongooseModule.forFeature([
      {
        name: NameTest.name,
        schema: NameTestSchema,
      },
    ]),
  ],
})
export class NameTestModule { }
