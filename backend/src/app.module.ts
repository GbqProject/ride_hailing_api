import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderModule } from './Riders/rider.module';
import { DriverModule } from './Drivers/driver.module';
import { RideModule } from './Ride/ride.module';
import {
  host,
  port,
  username,
  password,
  database_name,
} from './Common/Integrations/database_provider';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: host,
      port: port,
      username: username,
      password: password,
      database: database_name,
      synchronize: true,
      logging: true,
      subscribers: [],
      autoLoadEntities: true,
      migrations: [],
    }),
    RideModule,
    RiderModule,
    DriverModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

