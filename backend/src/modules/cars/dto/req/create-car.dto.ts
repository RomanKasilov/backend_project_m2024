import { PickType } from '@nestjs/swagger';

import { BaseCarReqDto } from './base-car.req.dto';

export class CreateCarDto extends PickType(BaseCarReqDto, [
  'brand',
  'model',
  'price',
  'currency',
  'description',
  'location',
  'carImage',
]) {}
