import { RoleEntity } from '../../../database/entities/role.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { ITokenPayload } from '../../auth/models/interfaces/token-payload.interface';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { BaseResUserDto } from '../models/dto/res/base-res.user.dto';
import { ShortResUserDto } from '../models/dto/res/short-res.user.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): ShortResUserDto {
    return {
      id: user.id,
      email: user.email,
      account: user.account,

      isBanned: user.isBanned,
      isActive: user.isActive,
      created: user.created,
      updated: user.updated,
      // image: `${process.env.AWS_S3_ENDPOINT}/${user.image}`,
    };
  }
  public static toUserInfo(user: UserEntity): BaseResUserDto {
    return {
      id: user.id,
      email: user.email,
      roles: user.roles ? user.roles.map((role) => role.name) : [],
      account: user.account,
      avatar: user.avatar
        ? `${process.env.AWS_S3_ENDPOINT}/${user.avatar}`
        : user.avatar,

      isBanned: user.isBanned,
      isActive: user.isActive,
      created: user.created,
      updated: user.updated,
    };
  }
  public static toIUserData(
    user: UserEntity,
    tokenPayload: ITokenPayload,
  ): IUserData {
    return {
      userId: user.id,
      email: tokenPayload.email,
    };
  }
}
