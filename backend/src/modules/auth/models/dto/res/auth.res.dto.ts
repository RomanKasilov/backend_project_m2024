import { ShortResUserDto } from '../../../../users/models/dto/res/short-res.user.dto';
import { TokenPairDto } from './token-pair.dto';

export class AuthResDto {
  tokens: TokenPairDto;
  user: ShortResUserDto;
}
