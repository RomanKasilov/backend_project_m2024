import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RoleNameEnum } from '../../../database/entities/enums/role-name.enum';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { RoleRepository } from '../../repository/services/role.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserMapper } from '../../users/services/user-mapper';
import { SignInAuthDto } from '../models/dto/req/sign-in.auth.dto';
import { SignUpAuthDto } from '../models/dto/req/sign-up.auth.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { TokenPairDto } from '../models/dto/res/token-pair.dto';
import { ITokenPair } from '../models/interfaces/token-pair.interface';
import { IUserData } from '../models/interfaces/user-data.interface';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}
  public async signUp(dto: SignUpAuthDto): Promise<AuthResDto> {
    await this.isEmailNotExistOrThrow(dto.email);
    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    await this.roleRepository.save(
      this.roleRepository.create({
        user_id: user.id,
        name: RoleNameEnum.VISITOR,
      }),
    );
    const tokens = await this.createAndSaveTokenPair({
      userId: user.id,
      email: dto.email,
    });
    return { user: UserMapper.toResDto(user), tokens };
  }

  public async signIn(dto: SignInAuthDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const tokens = await this.createAndSaveTokenPair({
      userId: user.id,
      email: dto.email,
    });
    const userEntity = await this.userRepository.findOneBy({ id: user.id });
    return { user: UserMapper.toResDto(userEntity), tokens };
  }

  public async signOut(userData: IUserData): Promise<void> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.email),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
      }),
    ]);
  }
  public async refresh(userData: IUserData): Promise<TokenPairDto> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.email),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
      }),
    ]);
    return await this.createAndSaveTokenPair(userData);
  }

  private async isEmailNotExistOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new Error('Email already exists');
    }
  }

  private async createAndSaveTokenPair(
    userData: IUserData,
  ): Promise<ITokenPair> {
    const tokens = await this.tokenService.generateTokenPair({
      userId: userData.userId,
      email: userData.email,
    });
    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        userData.userId,
        userData.email,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: userData.userId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
    return tokens;
  }
}
