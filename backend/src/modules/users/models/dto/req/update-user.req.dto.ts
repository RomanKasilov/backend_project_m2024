import { PartialType } from '@nestjs/mapped-types';
import { PickType } from '@nestjs/swagger';

import { BaseReqUserDto } from './base-req.user.dto';

export class UpdateUserReqDto extends PartialType(
  PickType(BaseReqUserDto, ['name', 'phone', 'password']),
) {}
