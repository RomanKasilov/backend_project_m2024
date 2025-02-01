import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class BaseReqUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 24)
  @Transform(({ value }) => value.trim())
  @Type(() => String)
  name?: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @Transform(TransformHelper.toStringTrimAndLowerCase)
  @Matches(new RegExp(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{3,}$/))
  email: string;

  @ApiProperty({ example: 'P@ssW0RD!' })
  @IsString()
  @Matches(
    new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,24}$/,
    ),
  )
  password: string;

  @IsOptional()
  @IsString()
  @Length(0, 3000)
  avatar?: string;

  @ApiProperty({ example: '0123456789' })
  @Type(() => String)
  @Matches(new RegExp(/^0([0-9]{9})$/))
  @Type(() => Number)
  phone: number;
}
