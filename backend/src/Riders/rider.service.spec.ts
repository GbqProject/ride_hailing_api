import { Test, TestingModule } from '@nestjs/testing';
import { RiderService } from './rider.service';
import { Rider } from './rider.entity';
import { Repository } from 'typeorm';
import { Driver } from '../Drivers/driver.entity';
import { location } from '../Common/interfaces/location.interface';
/*
describe('RiderService', () => {
  let riderService: RiderService;
  beforeEach(() => {
    riderService = new RiderService(null, null);
  });
  describe('getOptimalDriver', () => {
    it('should return a Driver object', () => {
      let drivers: Driver[] = [
        {
          driver_id: 1,
          driver_name: 'driver1',
          current_location: '{"lat":2,"lng":2}',
          on_a_ride: false,
        },
        {
          driver_id: 2,
          driver_name: 'driver1',
          current_location: '{"lat":1,"lng":1}',
          on_a_ride: false,
        },
      ];
      let current_location: location = {lat: 0, lng: 0};
      expect(riderService.getOptimalDriver(current_location, drivers).driver_id).toBe(2);
    });
  });
});*/
