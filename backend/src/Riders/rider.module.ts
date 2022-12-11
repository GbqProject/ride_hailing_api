import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderService } from './rider.service';
import { RiderController } from './rider.controller';
import { Rider } from './rider.entity';
import { HttpModule } from '@nestjs/axios';
import { DriverModule } from '../Drivers/driver.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rider]),
    HttpModule,
    DriverModule
  ],
  providers: [RiderService],
  controllers: [RiderController],
})
export class RiderModule {}
