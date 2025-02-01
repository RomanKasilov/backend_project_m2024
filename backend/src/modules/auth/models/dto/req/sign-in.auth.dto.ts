import { PickType } from '@nestjs/swagger';

import { BaseReqUserDto } from '../../../../users/models/dto/req/base-req.user.dto';

export class SignInAuthDto extends PickType(BaseReqUserDto, [
  'email',
  'password',
]) {}
