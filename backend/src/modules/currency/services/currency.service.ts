import { HttpService } from '@nestjs/axios';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';

import { CurrencyRepository } from '../../repository/services/currency.repository';
import { ICrudHttpResp } from '../models/interfaces/crud-http.resp.interface';
import { ICurrencyValue } from '../models/interfaces/currency-value.interface';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly currencyRepository: CurrencyRepository,
  ) {}

  @Timeout(10000)
  async handleTimeout() {
    await this.getCurrency();
    console.log('timeout currency updated');
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handleCron() {
    await this.getCurrency();
    console.log('currency updated');
  }
  private async getCurrency() {
    const { data } = await this.httpService.axiosRef.get(
      'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11',
    );
    if (!data) {
      throw new ServiceUnavailableException(
        'Currency Service Temporarily Unavailable',
      );
    }
    const newCurrency = this.currencyValues(data);
    const oldCurrency = await this.currencyRepository.find();
    if (oldCurrency) {
      await this.currencyRepository.remove(oldCurrency);
    }
    const entities = newCurrency.map((currency) =>
      this.currencyRepository.create(currency),
    );
    await this.currencyRepository.save(entities);
  }
  // public async getCurrency(name: CurrencyNameEnum) {
  //   await this.currencyRepository.findOneBy({ name });
  // }
  private currencyValues(arr: ICrudHttpResp[]): ICurrencyValue[] {
    return arr.map(({ ccy, buy, sale }: ICrudHttpResp): ICurrencyValue => {
      return { name: ccy, buyValue: Number(buy), sellValue: Number(sale) };
    });
  }
}
