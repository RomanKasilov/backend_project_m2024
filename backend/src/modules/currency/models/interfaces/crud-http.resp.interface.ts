import { CurrencyNameEnum } from '../enums/currency-name.enum';

export interface ICrudHttpResp {
  ccy: CurrencyNameEnum;
  base_ccy: CurrencyNameEnum;
  buy: string;
  sale: string;
}
