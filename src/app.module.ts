import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config/envs';
import { NameTestModule } from './name-test/name-test.module';

@Module({
  imports: [MongooseModule.forRoot(envs.databaseUrl), NameTestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
