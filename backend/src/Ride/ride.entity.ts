import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Rider } from "../Riders/rider.entity";
import { Driver } from "../Drivers/driver.entity";

@Entity()
export class Ride{
    @PrimaryGeneratedColumn()
    ride_id: number;

    @ManyToOne(()=>Rider, (rider) => rider.rider_id)
	rider: Rider;

    @ManyToOne(()=>Driver, (driver) => driver.driver_id)
	driver: Driver;

    @Column({default: null})
	start_location: string;

    @Column({default: null})
	end_location: string;

    @Column({default: null})
	start_date:Date;

    @Column({default: null})
	end_date:Date;

    @Column({default: null})
	transaction_id : string;

    @Column({default: null})
	transaction_value : number;

    @Column({default: null})
	payment_source: number;
}