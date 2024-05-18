import { envs } from './config/envs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BarbersModule } from './barbers/barbers.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    MongooseModule.forRoot(envs.databaseUrl),
    ClientsModule,
    BarbersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
