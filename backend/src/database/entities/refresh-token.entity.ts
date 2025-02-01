import { PickType } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RefreshTokenID, UserID } from '../../common/types/entities-id.types';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/createAt-updateAt.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.REFRESH_TOKENS)
export class RefreshTokenEntity extends PickType(CreateUpdateModel, [
  'created',
]) {
  @PrimaryGeneratedColumn('uuid')
  id: RefreshTokenID;

  @Column('text')
  refreshToken: string;

  @Column('uuid')
  user_id: UserID;
  @ManyToOne(() => UserEntity, (user) => user.refreshTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
