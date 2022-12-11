import { Entity, Column, PrimaryColumn,OneToMany } from 'typeorm';
import { Ride } from '../Ride/ride.entity';

@Entity()
export class Driver {
  @PrimaryColumn()
  driver_id: number;

  @Column()
  driver_name: string;

  @Column({default: null})
  current_location: string;

  @Column({default: false})
  on_a_ride: boolean;

  @OneToMany(() => Ride, (ride) => ride.rider)
  rides: Ride[]
}
