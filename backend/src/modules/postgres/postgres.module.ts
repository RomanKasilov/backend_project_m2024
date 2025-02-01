import * as path from 'node:path';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ConfigurationType,
  DatabaseConfigType,
} from '../../../config/config.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<ConfigurationType>) => {
        const dataConfig = configService.get<DatabaseConfigType>('database');
        return {
          type: 'postgres',
          host: dataConfig.host,
          port: dataConfig.port,
          username: dataConfig.user,
          password: dataConfig.password,
          database: dataConfig.name,
          entities: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'entities',
              '*.entity.js',
            ),
          ],
          migrations: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'migrations',
              '*.js',
            ),
          ],
          synchronize: false, // no synchronize, we use migrations
          migrationsRun: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PostgresModule {}
