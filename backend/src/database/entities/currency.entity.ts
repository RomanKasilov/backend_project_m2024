import { PickType } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CurrencyID } from '../../common/types/entities-id.types';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/createAt-updateAt.model';

@Entity(TableNameEnum.CURRENCY)
export class CurrencyEntity extends PickType(CreateUpdateModel, ['updated']) {
  @PrimaryGeneratedColumn('uuid')
  id: CurrencyID;

  @Column('text')
  name: string;

  @Column('numeric')
  buyValue: number;

  @Column('numeric')
  sellValue: number;
}

// export enum CurrencyNameEnum {
//   EUR = 'EUR',
//   USD = 'USD',
//   UAH = 'UAH',
// }
// export interface ICurrencyValue {
//   name: CurrencyNameEnum;
//   buyValue: string;
//   sellValue: string;
// }
// export interface ICrudHttpResp {
//   ccy: CurrencyNameEnum;
//   base_ccy: CurrencyNameEnum;
//   buy: string;
//   sale: string;
// }
// const currencyValues = (arr: ICrudHttpResp[]): ICurrencyValue[] => {
//   return arr.map(({ ccy, buy, sale }: ICrudHttpResp): ICurrencyValue => {
//     return { name: ccy, buyValue: buy, sellValue: sale };
//   });
// };
