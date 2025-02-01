import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import {
  ConfigurationType,
  RedisConfigType,
} from '../../../config/config.type';
import { REDIS_CLIENT } from './models/redis.constants';
import { RedisService } from './services/redis.service';

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (configService: ConfigService<ConfigurationType>) => {
        const redisConfig = configService.get<RedisConfigType>('redis');
        return new Redis({
          host: redisConfig.host,
          port: redisConfig.port,
          password: redisConfig.password,
        });
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
