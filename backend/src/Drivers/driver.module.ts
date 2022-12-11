import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { Driver } from './driver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver]),
  ],
  providers: [DriverService],
  controllers: [DriverController],
  exports: [DriverService],
})
export class DriverModule {}

