import { Injectable } from '@nestjs/common';

import { TraderProfileID } from '../../../common/types/entities-id.types';
import { CurrencyNameEnum } from '../../currency/models/enums/currency-name.enum';
import { ContentType } from '../../file-storage/enum/content-type.enum';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { CarRepository } from '../../repository/services/car.repository';
import { CurrencyRepository } from '../../repository/services/currency.repository';
import { CreateCarDto } from '../dto/req/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly carRepository: CarRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}
  public async create(
    dto: CreateCarDto,
    traderId: TraderProfileID,
    file: Express.Multer.File,
  ) {
    let currencyValue = 1;
    if (dto.currency !== CurrencyNameEnum.UAH) {
      const { buyValue } = await this.currencyRepository.findOneBy({
        name: dto.currency,
      });
      currencyValue = buyValue;
    }

    const car = await this.carRepository.save(
      this.carRepository.create({
        brand: dto.brand,
        model: dto.model,
        price: dto.price * currencyValue,
        description: dto.description,
        location: dto.location ? dto.location : null,
        trader_id: traderId,
      }),
    );

    if (file) {
      const pathToFile = await this.fileStorageService.uploadFile(
        file,
        ContentType.IMAGE,
        car.id,
      );
      this.carRepository.merge(car, { carImage: pathToFile });
      await this.carRepository.save(car);
    }
    return car;
  }

  findAll() {
    return `This action returns all cars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
