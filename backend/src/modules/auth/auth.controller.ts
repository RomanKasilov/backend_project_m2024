import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { SignInAuthDto } from './models/dto/req/sign-in.auth.dto';
import { SignUpAuthDto } from './models/dto/req/sign-up.auth.dto';
import { AuthResDto } from './models/dto/res/auth.res.dto';
import { TokenPairDto } from './models/dto/res/token-pair.dto';
import { IUserData } from './models/interfaces/user-data.interface';
import { AuthService } from './services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('sign-up')
  public async signUp(@Body() dto: SignUpAuthDto): Promise<AuthResDto> {
    return await this.authService.signUp(dto);
  }

  @SkipAuth()
  @Post('/sign-in')
  signIn(@Body() dto: SignInAuthDto) {
    return this.authService.signIn(dto);
  }

  @ApiBearerAuth()
  @Post('sign-out')
  public async signOut(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.authService.signOut(userData);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenPairDto> {
    return await this.authService.refresh(userData);
  }
}
