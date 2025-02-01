import { Module } from '@nestjs/common';

import { CarsModule } from '../cars/cars.module';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [FileStorageModule, CarsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
