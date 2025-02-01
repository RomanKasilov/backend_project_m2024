import { PartialType } from '@nestjs/mapped-types';
import { PickType } from '@nestjs/swagger';

import { BaseResUserDto } from './base-res.user.dto';

export class ShortResUserDto extends PickType(BaseResUserDto, [
  'id',
  'email',
  'account',
  'isActive',
  'isBanned',
  'created',
  'updated',
]) {}
