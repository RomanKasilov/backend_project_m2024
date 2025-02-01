import { PartialType } from '@nestjs/mapped-types';

import { CreateCarDto } from './req/create-car.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {}
