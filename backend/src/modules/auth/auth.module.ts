import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { RedisModule } from '../redis/redis.module';
import { AuthController } from './auth.controller';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [JwtModule, RedisModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    RefreshTokenGuard,
    AuthCacheService,
    AuthService,
    TokenService,
  ],
})
export class AuthModule {}
