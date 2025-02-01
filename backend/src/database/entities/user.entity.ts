import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserID } from '../../common/types/entities-id.types';
import { TableNameEnum } from './enums/table-name.enum';
import { UserAccountEnum } from './enums/user-account.enum';
import { CreateUpdateModel } from './models/createAt-updateAt.model';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RoleEntity } from './role.entity';
import { TraderProfileEntity } from './trader-profile.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: UserID;

  @Column('text', { unique: true })
  email: string;

  @IsOptional()
  @Column('text')
  name: string;

  @Column('text', { select: false })
  password: string;

  @OneToMany(() => RoleEntity, (role) => role.user)
  roles?: RoleEntity[];

  @Column({
    type: 'enum',
    enum: UserAccountEnum,
    default: UserAccountEnum.BASIC,
  })
  account: UserAccountEnum;

  @Column('integer')
  phone: number;

  @IsOptional()
  @Column('text', { nullable: true })
  avatar?: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToOne(() => TraderProfileEntity, (profile) => profile.user)
  traderProfile?: TraderProfileEntity;

  @Column('boolean', { default: false })
  isBanned: boolean;

  @Column('boolean', { default: true })
  isActive: boolean;
}
