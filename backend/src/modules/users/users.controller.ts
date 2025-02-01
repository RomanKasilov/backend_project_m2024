import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { ApiFile } from '../../common/decorators/api-file.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { CreateCarDto } from '../cars/dto/req/create-car.dto';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { BaseResUserDto } from './models/dto/res/base-res.user.dto';
import { UserMapper } from './services/user-mapper';
import { UsersService } from './services/users.service';

@ApiTags('user')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  public async getMe(
    @CurrentUser() currentUserData: IUserData,
  ): Promise<BaseResUserDto> {
    const result = await this.usersService.getMe(currentUserData.userId);
    return UserMapper.toUserInfo(result);
  }

  @Patch('me')
  public async updateMe(
    @CurrentUser() currentUserData: IUserData,
    @Body() dto: UpdateUserReqDto,
  ): Promise<BaseResUserDto> {
    const result = await this.usersService.updateMe(
      currentUserData.userId,
      dto,
    );
    return UserMapper.toUserInfo(result);
  }

  @Delete('me')
  public async removeMe(
    @CurrentUser() currentUserData: IUserData,
  ): Promise<void> {
    await this.usersService.removeMe(currentUserData.userId);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiFile('avatar')
  @Post('me/avatar')
  public async uploadAvatar(
    @CurrentUser() userData: IUserData,
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<void> {
    await this.usersService.uploadAvatar(userData.userId, file);
  }

  @Delete('me/avatar')
  public async deleteAvatar(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.deleteAvatar(userData.userId);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('carImage'))
  @Post('me/adv')
  public async createAdv(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateCarDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const result = await this.usersService.createAdv(
      userData.userId,
      dto,
      file,
    );
    return result;
  }
}
