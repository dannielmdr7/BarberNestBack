import { Module } from '@nestjs/common';
import { BarbersService } from './barbers.service';
import { BarbersController } from './barbers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Barber, BarberSchema } from './entities/barber.entity';

@Module({
  controllers: [BarbersController],
  providers: [BarbersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Barber.name,
        schema: BarberSchema,
      },
    ]),
  ],
})
export class BarbersModule {}
