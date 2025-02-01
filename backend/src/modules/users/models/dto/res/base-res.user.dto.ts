import { ApiProperty } from '@nestjs/swagger';

import { UserID } from '../../../../../common/types/entities-id.types';

export class BaseResUserDto {
  @ApiProperty({ type: String }) // type for representing in swagger
  id: UserID;
  name?: string;
  email: string;
  phone?: number;
  roles: string[];
  account: string;
  avatar?: string;

  isBanned: boolean;
  isActive: boolean;
  created: Date;
  updated: Date;
}
