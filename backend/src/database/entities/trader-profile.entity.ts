import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TraderProfileID, UserID } from '../../common/types/entities-id.types';
import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/createAt-updateAt.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.TRADER_PROFILE)
export class TraderProfileEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: TraderProfileID;

  @Column({ type: 'text', nullable: true, default: null })
  company?: string;

  @Column()
  user_id: UserID;
  @OneToOne(() => UserEntity, (user) => user.traderProfile)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CarEntity, (car) => car.trader)
  cars?: CarEntity[];
}
