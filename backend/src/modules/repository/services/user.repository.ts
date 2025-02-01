import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserID } from '../../../common/types/entities-id.types';
import { UserEntity } from '../../../database/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async getUserWithRoles(userId: UserID): Promise<UserEntity> {
    const qb = this.createQueryBuilder('user');
    qb.setParameter('userId', userId);
    qb.leftJoinAndSelect('user.roles', 'role', 'role.user_id = :userId');
    qb.where('user.id = :userId');
    return await qb.getOne();
  }
}
