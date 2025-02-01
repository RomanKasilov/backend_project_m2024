import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { CurrencyNameEnum } from '../../../currency/models/enums/currency-name.enum';

export class BaseCarReqDto {
  @ApiProperty({ example: 'bmw' })
  @Transform(TransformHelper.toStringTrimAndLowerCase)
  @Length(3, 12)
  brand: string;

  @Transform(TransformHelper.toStringTrimAndLowerCase)
  @Length(3, 12)
  model: string;

  @Type(() => Number)
  @IsPositive()
  @Min(1)
  @Max(99999999)
  price: number;

  @IsOptional()
  @IsEnum(CurrencyNameEnum)
  currency: CurrencyNameEnum = CurrencyNameEnum.UAH;

  @IsString()
  @Length(3, 124)
  description: string;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.toStringTrimAndLowerCase)
  @Length(3, 24)
  location: string;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  carImage?: any;
}
