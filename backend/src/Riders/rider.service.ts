import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rider } from './rider.entity';
import { HttpService } from '@nestjs/axios/dist';
import {
  url,
  api_payment_sources,
  api_acceptance_token,
  bearer_pub_token,
  bearer_priv_token,
} from '../Common/Integrations/payment_provider';
import { location } from '../Common/interfaces/location.interface';
import { DriverService } from '../Drivers/driver.service';
import { Driver } from '../Drivers/driver.entity';
import { Ride } from '../Ride/ride.entity';
import { RideService } from '../Ride/ride.service';

@Injectable()
export class RiderService {
  constructor(
    @InjectRepository(Rider)
    private ridersRepository: Repository<Rider>,
    private httpService: HttpService,
    @Inject(DriverService)
    private driverService: DriverService,
    @Inject(RideService)
    private rideService: RideService,
  ) {}

  findAll(): Promise<Rider[]> {
    return this.ridersRepository.find();
  }

  findOne(rider_id: number): Promise<Rider> {
    return this.ridersRepository.findOneBy({ rider_id: rider_id });
  }

  /**
   * It creates a payment source, storages the payment_source_id and return it.
   * @param id_rider
   *
   */
  async createPaymentMethod(id_rider: number) {
    try {
      let rider: Rider = await this.findOne(id_rider);
      let id_payment_source = await this.createPaymentSource(rider);
      rider.payment_source = id_payment_source;
      this.ridersRepository.save(rider);
      return { status: 'created', payment_source: rider.payment_source };
    } catch (error) {
      return { status: 'payment_error', error: error.response.data };
    }
  }
  /**
   * Consumes an api for create a payment source.
   * @param rider
   * @returns payment_id
   */
  async createPaymentSource(rider: Rider) {
    let data: object = {
      type: 'CARD',
      token: rider.token,
      customer_email: rider.email,
      acceptance_token: await this.requestAcceptanceToken(),
    };
    const config = {
      headers: { Authorization: `Bearer ${bearer_priv_token}` },
    };
    const res = await this.httpService.axiosRef.post(
      url + api_payment_sources,
      data,
      config,
    );
    return res.data.data.id;
  }

  /**
   * Request an acceptance token from an external api.
   * @returns acceptance token
   */
  async requestAcceptanceToken() {
    const config = {
      headers: { Authorization: `Bearer ${bearer_pub_token}` },
    };
    const res = await this.httpService.axiosRef.get(
      url + api_acceptance_token + '/' + bearer_pub_token,
      config,
    );
    return res.data.data.presigned_acceptance.acceptance_token;
  }

  async requestARide(rider_id: number, current_location: location) {
    let result: object;
    const rider: Rider = await this.findOne(rider_id);
    let assigned_driver: Driver = await this.driverService.assignDriver(
      current_location,
    );
    if (assigned_driver) {
      const new_ride: Ride = {
        ride_id: null,
        driver: assigned_driver,
        start_location: JSON.stringify(current_location),
        end_location: null,
        rider: rider,
        start_date: new Date(),
        end_date: null,
        transaction_id: null,
        transaction_value: null,
        payment_source: null,
      };
      const created_ride: Ride = await this.rideService.saveRide(new_ride);
      assigned_driver.on_a_ride = true;
      assigned_driver = await this.driverService.saveOne(assigned_driver);
      result = {
        status: 'created',
        ride_id: created_ride.ride_id,
        assigned_driver: assigned_driver,
      };
    } else {
      result = { status: 'error', error: 'no drivers available' };
    }
    return result;
  }
}
