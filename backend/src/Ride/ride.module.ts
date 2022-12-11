import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './ride.entity';
import { RideService } from './ride.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Ride]), HttpModule],
  providers: [RideService],
  exports: [RideService]
})

export class RideModule {}