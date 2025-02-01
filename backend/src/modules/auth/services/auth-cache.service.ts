import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigurationType, JwtConfig } from '../../../../config/config.type';
import { RedisService } from '../../redis/services/redis.service';

@Injectable()
export class AuthCacheService {
  private jwtConfig: JwtConfig;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<ConfigurationType>,
  ) {
    this.jwtConfig = this.configService.get('jwt');
  }

  public async saveToken(
    token: string,
    userId: string,
    email: string,
  ): Promise<void> {
    const key = this.getKey(userId, email);
    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, token);
    await this.redisService.expire(key, this.jwtConfig.accessExpiresIn);
  }
  public async isAccessTokenExist(
    userId: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    const key = this.getKey(userId, email);
    const set = await this.redisService.sMembers(key);
    return set.includes(token);
  }

  public async deleteToken(userId: string, email: string): Promise<void> {
    const key = this.getKey(userId, email);
    await this.redisService.deleteByKey(key);
  }

  private getKey(userId: string, email: string): string {
    return `ACCESS_TOKEN:${userId}:${email}`;
  }
}
