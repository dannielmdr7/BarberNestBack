import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './entities/client.entity';
import { Barber, BarberSchema } from 'src/barbers/entities/barber.entity';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Client.name,
        schema: ClientSchema,
      },
      {
        name: Barber.name,
        schema: BarberSchema,
      },
    ]),
  ],
})
export class ClientsModule {}
