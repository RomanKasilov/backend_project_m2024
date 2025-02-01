import * as path from 'node:path';
import * as process from 'node:process';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import configuration from '../config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { CarsModule } from './modules/cars/cars.module';
import { CurrencyModule } from './modules/currency/currency.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RedisModule } from './modules/redis/redis.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: path.resolve(process.cwd(), '../.env'),
    }),
    ScheduleModule.forRoot(),
    RedisModule,
    PostgresModule,
    RepositoryModule,
    AuthModule,

    UsersModule,
    CarsModule,
    CurrencyModule,
  ],
})
export class AppModule {}
