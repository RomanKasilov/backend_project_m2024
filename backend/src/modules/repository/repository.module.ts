import { Global, Module } from '@nestjs/common';

import { CarRepository } from './services/car.repository';
import { CurrencyRepository } from './services/currency.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { RoleRepository } from './services/role.repository';
import { TraderProfileRepository } from './services/trader-profile.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  TraderProfileRepository,
  CarRepository,
  CurrencyRepository,
  RefreshTokenRepository,
  RoleRepository,
  UserRepository,
];
@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
