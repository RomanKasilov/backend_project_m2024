import { PickType } from '@nestjs/swagger';

import { BaseReqUserDto } from '../../../../users/models/dto/req/base-req.user.dto';

export class SignUpAuthDto extends PickType(BaseReqUserDto, [
  'email',
  'password',
  'name',
  'phone',
]) {}
