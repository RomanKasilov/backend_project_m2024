import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { ConfigurationType, JwtConfig } from '../../../../config/config.type';
import { TokenTypeEnum } from '../models/enums/token-type.enum';
import { ITokenPair } from '../models/interfaces/token-pair.interface';
import { ITokenPayload } from '../models/interfaces/token-payload.interface';

@Injectable()
export class TokenService {
  private readonly jwtConfig: JwtConfig;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ConfigurationType>,
  ) {
    this.jwtConfig = configService.get<JwtConfig>('jwt');
  }

  public async generateTokenPair(payload: ITokenPayload): Promise<ITokenPair> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.accessSecret,
      expiresIn: this.jwtConfig.accessExpiresIn,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshSecret,
      expiresIn: this.jwtConfig.refreshExpiresIn,
    });
    return { accessToken, refreshToken };
  }

  public async verifyToken(
    token: string,
    type: TokenTypeEnum,
  ): Promise<ITokenPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.getSecret(type),
      });
    } catch (e) {
      //cause can finish with unauthorized exception
      throw new UnauthorizedException('Invalid token');
    }
  }
  private getSecret(type: TokenTypeEnum): string {
    let secret: string;
    switch (type) {
      case TokenTypeEnum.ACCESS:
        secret = this.jwtConfig.accessSecret;
        break;
      case TokenTypeEnum.REFRESH:
        secret = this.jwtConfig.refreshSecret;
        break;
      default:
        throw new Error('Unknown token type');
    }
    return secret;
  }
}
