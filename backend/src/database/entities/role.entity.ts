import { PickType } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RoleID, UserID } from '../../common/types/entities-id.types';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/createAt-updateAt.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ROLES)
export class RoleEntity extends PickType(CreateUpdateModel, ['created']) {
  @PrimaryGeneratedColumn('uuid')
  id: RoleID;

  @Column('text')
  name: string;

  @Column('uuid')
  user_id: UserID;
  @ManyToOne(() => UserEntity, (user) => user.roles)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
