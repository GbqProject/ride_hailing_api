import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { location } from '../Common/interfaces/location.interface';
import { DriverService } from './driver.service';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get('findAll')
  findAll() {
    return this.driverService.findAll();
  }
  /**
   * It finishes a driver ride
   * @param driver_id: number
   * @param final_location: location
   * @returns response
   */
  @Post('finishARide')
  finishARide(@Req() request: Request){
    console.log(request.body);
    const driver_id: number = request.body.driver_id;
    const final_location: location = request.body.final_location;
    if(driver_id && final_location){
      return this.driverService.finishARide(driver_id, final_location);
    }else{
      return {status: 'error', error: 'Missing parameters. You must send driver_id and final_location'}
    }
  }
}
