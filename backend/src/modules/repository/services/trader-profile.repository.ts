import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserID } from '../../../common/types/entities-id.types';
import { TraderProfileEntity } from '../../../database/entities/trader-profile.entity';

@Injectable()
export class TraderProfileRepository extends Repository<TraderProfileEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TraderProfileEntity, dataSource.manager);
  }

  public async findOneByUserId(userId: UserID) {
    const qb = this.createQueryBuilder('profile');
    qb.leftJoinAndSelect('profile.user', 'user');
    qb.where('user.id = :userId', { userId });
    return await qb.getOne();
  }
}
