import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CarID, TraderProfileID } from '../../common/types/entities-id.types';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/createAt-updateAt.model';
import { TraderProfileEntity } from './trader-profile.entity';

@Entity(TableNameEnum.CARS)
export class CarEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: CarID;

  @Column('uuid')
  trader_id: TraderProfileID;
  @ManyToOne(() => TraderProfileEntity, (profile) => profile.cars)
  @JoinColumn({ name: 'trader_id' })
  trader: TraderProfileEntity;

  @Column('text')
  brand: string;

  @Column('text')
  model: string;

  @Column('numeric')
  price: number;

  @Column({ type: 'text', nullable: true, default: null })
  location?: string;

  @Column('text')
  description: string;

  @Column('text', { nullable: true, default: null })
  carImage?: string;

  @Column('boolean', { default: true })
  active: boolean;
}
