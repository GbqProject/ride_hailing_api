import { Entity, Column, PrimaryColumn, OneToMany  } from 'typeorm';
import { Ride } from '../Ride/ride.entity';

@Entity()
export class Rider {
  @PrimaryColumn()
  rider_id: number;
  
  @Column()
  rider_name: string;

  @Column()
  email: string;
  
  @Column({default: null})
  payment_source: number;

  @Column()
  token: string;

  @OneToMany(() => Ride, (ride) => ride.rider)
  rides: Ride[]
}