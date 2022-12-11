import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { RiderService } from './rider.service';
import { location } from '../Common/interfaces/location.interface';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}
  @Get('findAll')
  findAll() {
    return this.riderService.findAll();
  }

  @Post('createPaymentSource')
  createPaymentSource(@Req() request: Request) {
    const rider_id: number = request.body.rider_id;
    if (rider_id == null) {
      return {
        status: 'error',
        error: 'Missing parameters. You must send rider_id',
      };
    } else {
      return this.riderService.createPaymentMethod(rider_id);
    }
  }


  @Post('RequestARide')
  RequestARide(@Req() request: Request) {
    const rider_id: number = request.body.rider_id;
    const current_location: location = request.body.current_location;
    return this.riderService.requestARide(rider_id, current_location);
  }
}
