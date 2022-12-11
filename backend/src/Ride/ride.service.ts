import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ride } from './ride.entity';
import { getLocationFromJson } from '../Common/functions/parser_utilities';
import { getDistanceBetween } from '../Common/functions/calculations';
import { location } from 'src/Common/interfaces/location.interface';
import * as moment from 'moment';
import {
  url,
  api_transaction,
  bearer_priv_token,
} from '../Common/Integrations/payment_provider';
import { HttpService } from '@nestjs/axios/dist';
import { Driver } from '../Drivers/driver.entity';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Ride)
    private rideRepository: Repository<Ride>,
    private httpService: HttpService,
  ) {}

  findOne(id: number) {
    return this.rideRepository.findOneBy({ ride_id: id });
  }

  saveRide(ride: Ride) {
    return this.rideRepository.save(ride);
  }

  /**
   * Calculate the price of a ride
   * @param ride: Ride
   * @returns price: number
   */
  calculateRidePrice(ride: Ride): number {
    let total: number = 0;
    total += this.calculateDistancePrice(ride);
    total += this.calculateTimePrice(ride);
    total += 3500; //Base
    return Math.trunc(total);
  }

  /**
   * Calculate the price of a ride considering only distance aspect
   * @param ride: Ride
   * @returns price: number
   */
  calculateDistancePrice(ride: Ride): number {
    const start_point: location = getLocationFromJson(ride.start_location);
    const end_point: location = getLocationFromJson(ride.end_location);
    const total_distance: number = getDistanceBetween(start_point, end_point); //In km
    return total_distance * 1000; //COP $1000 for each km
  }

  /**
   * Calculate the price of a ride considering only time aspect
   * @param ride: Ride
   * @returns price: number
   */
  calculateTimePrice(ride: Ride): number {
    let m_start_date = moment(ride.start_date);
    let m_end_date = moment(ride.end_date);
    const total_minutes: number = m_end_date.diff(m_start_date, 'minutes');
    return total_minutes * 200; //COP $200 for every minute elapsed
  }

  /**
   * Create a transaction in the payment provider
   * @param ride: Ride
   * @returns transaction_id Promise<number>
   */
  async createTransaction(ride: Ride): Promise<number> {
    console.log('valor', ride.transaction_value);
    let data: object = {
      amount_in_cents: ride.transaction_value, // Amount in cents
      currency: 'COP', // Currency
      customer_email: ride.rider.email, // User email
      payment_method: {
        installments: 2, // Number of installment if the payment source represents a card otherwise ignore the payment_method field altogether.
      },
      reference: 'reference_dev1_' + ride.ride_id.toString(), // Unique payment reference
      payment_source_id: ride.rider.payment_source, // Payment source ID
    };
    const config = {
      headers: { Authorization: `Bearer ${bearer_priv_token}` },
    };
    const res = await this.httpService.axiosRef.post(
      url + api_transaction,
      data,
      config,
    );
    return res.data.data.id;
  }

  findOneByDriver(driver: Driver) {
    return this.rideRepository.find({
      where: { driver: { driver_id: driver.driver_id } },
      relations: { rider: true, driver: true },
    });
  }
}
