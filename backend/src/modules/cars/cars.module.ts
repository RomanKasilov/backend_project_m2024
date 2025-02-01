import { Module } from '@nestjs/common';

import { FileStorageModule } from '../file-storage/file-storage.module';
import { CarsController } from './cars.controller';
import { CarsService } from './services/cars.service';

@Module({
  imports: [FileStorageModule],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
