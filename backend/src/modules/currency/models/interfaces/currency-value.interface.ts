import { CurrencyNameEnum } from '../enums/currency-name.enum';

export interface ICurrencyValue {
  name: CurrencyNameEnum;
  buyValue: number;
  sellValue: number;
}
