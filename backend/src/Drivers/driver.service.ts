import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { getDistanceBetween } from '../Common/functions/calculations';
import { getLocationFromJson } from '../Common/functions/parser_utilities';
import { location } from '../Common/interfaces/location.interface';
import { Ride } from '../Ride/ride.entity';
import { RideService } from '../Ride/ride.service';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @Inject(forwardRef(() => RideService))
    private rideService: RideService,
  ) {}

  findAll() {
    return this.driverRepository.find();
  }
  /**
   * Find all available drivers
   * @returns
   */
  findAllAvailable(): Promise<Driver[]> {
    return this.driverRepository.findBy({ on_a_ride: false });
  }

  findOne(drider_id: number) {
    return this.driverRepository.findOneBy({ driver_id: drider_id });
  }

  saveOne(driver: Driver): Promise<Driver> {
    return this.driverRepository.save(driver);
  }

  /**
   * Assign a driver given a current location
   * @param current_location
   * @returns Driver
   */
  async assignDriver(current_location: location): Promise<Driver> {
    let drivers: Driver[] = await this.findAllAvailable();
    //If there are no drivers available
    if (drivers.length == 0) {
      return new Driver(); //Empty driver
    } else {
      return this.getOptimalDriver(current_location, drivers);
    }
  }

  getOptimalDriver(rider_location: location, drivers: Driver[]): Driver {
    drivers.sort((a: Driver, b: Driver) => {
      let a_value = getDistanceBetween(
        getLocationFromJson(a.current_location),
        rider_location,
      );
      let b_value = getDistanceBetween(
        getLocationFromJson(b.current_location),
        rider_location,
      );
      return a_value - b_value;
    });
    return drivers[0];
  }

  async finishARide(driver_id: number, final_location: location) {
    try {
      let driver: Driver = await this.findOne(driver_id);
      console.log('driver', driver);
      let ride: Ride = (await this.rideService.findOneByDriver(driver))[0];
      console.log('ride', ride);
      //Editing and saving ride
      ride.end_date = new Date();
      ride.end_location = JSON.stringify(final_location);
      ride.transaction_value = this.rideService.calculateRidePrice(ride);
      const transaction_id = await this.rideService.createTransaction(ride);
      ride.transaction_id = transaction_id.toString();
      ride = await this.rideService.saveRide(ride);
      //Editing and saving driver
      driver.current_location = JSON.stringify(final_location);
      driver.on_a_ride = false;
      driver = await this.saveOne(driver);
      return { status: 'created', ride: ride, driver: driver };
    } catch (error) {
      return { status: 'error', error: error.response.data};
    }
  }
}
