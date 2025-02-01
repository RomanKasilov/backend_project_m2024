import { ForbiddenException, Injectable } from '@nestjs/common';

import { UserID } from '../../../common/types/entities-id.types';
import { RoleNameEnum } from '../../../database/entities/enums/role-name.enum';
import { UserAccountEnum } from '../../../database/entities/enums/user-account.enum';
import { UserEntity } from '../../../database/entities/user.entity';
import { CreateCarDto } from '../../cars/dto/req/create-car.dto';
import { CarsService } from '../../cars/services/cars.service';
import { CurrencyNameEnum } from '../../currency/models/enums/currency-name.enum';
import { ContentType } from '../../file-storage/enum/content-type.enum';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { CarRepository } from '../../repository/services/car.repository';
import { CurrencyRepository } from '../../repository/services/currency.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { RoleRepository } from '../../repository/services/role.repository';
import { TraderProfileRepository } from '../../repository/services/trader-profile.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly traderProfileRepository: TraderProfileRepository,
    private readonly carRepository: CarRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly roleRepository: RoleRepository,
    private readonly carsService: CarsService,
  ) {}

  public async getMe(userId: UserID): Promise<UserEntity> {
    return await this.userRepository.getUserWithRoles(userId);
  }

  public async updateMe(
    userId: UserID,
    dto: UpdateUserReqDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    this.userRepository.merge(user, dto);
    return await this.userRepository.save(user);
  }
  public async uploadAvatar(
    userId: UserID,
    file: Express.Multer.File,
  ): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const pathToFile = await this.fileStorageService.uploadFile(
      file,
      ContentType.IMAGE,
      userId,
    );
    if (user.avatar) {
      await this.fileStorageService.deleteFile(user.avatar);
    }
    await this.userRepository.save({ ...user, avatar: pathToFile });
  }
  public async deleteAvatar(userId: UserID): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user.avatar) {
      await this.fileStorageService.deleteFile(user.avatar);
      await this.userRepository.save({ ...user, avatar: null });
    }
  }

  public async removeMe(userId: UserID): Promise<void> {
    await this.userRepository.update({ id: userId }, { isActive: false });
    await this.refreshTokenRepository.delete({ user_id: userId });
  }

  public async createAdv(
    userId: UserID,
    dto: CreateCarDto,
    file: Express.Multer.File,
  ) {
    const user = await this.userRepository.findOneBy({ id: userId });
    // const traderProfile = await this.traderProfileRepository.findOneByUserId(userId)
    const traderProfile = await this.traderProfileRepository.findOneBy({
      user_id: userId,
      cars: [],
    });
    if (!traderProfile) {
      await this.traderProfileRepository.save(
        this.traderProfileRepository.create({ user_id: userId }),
      );
      await this.roleRepository.save(
        this.roleRepository.create({
          user_id: userId,
          name: RoleNameEnum.TRADER,
        }),
      );
    }
    if (
      traderProfile.cars?.length >= 1 &&
      user.account === UserAccountEnum.BASIC
    ) {
      throw new ForbiddenException(
        'your profile has already exist a car. Try premium account to upload more cars',
      );
    }
    return await this.carsService.create(dto, traderProfile.id, file);
  }

  public async findOneByID(userId: UserID): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
  }
}
