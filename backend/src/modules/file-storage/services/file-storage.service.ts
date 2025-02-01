import { randomUUID } from 'node:crypto';
import * as path from 'node:path';

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  AwsConfigType,
  ConfigurationType,
} from '../../../../config/config.type';
import { ContentType } from '../enum/content-type.enum';

@Injectable()
export class FileStorageService {
  private readonly awsConfig: AwsConfigType;
  private readonly s3Client: S3Client;

  constructor(
    // private readonly logger: LoggerService,
    private readonly configService: ConfigService<ConfigurationType>,
  ) {
    this.awsConfig = this.configService.get<AwsConfigType>('aws');
    this.s3Client = new S3Client({
      region: this.awsConfig.region,
      credentials: {
        accessKeyId: this.awsConfig.accessKey,
        secretAccessKey: this.awsConfig.secretKey,
      },
    });
  }

  public async uploadFile(
    file: Express.Multer.File,
    itemType: ContentType,
    itemId: string,
  ): Promise<string> {
    try {
      const filePath = this.buildPath(itemType, itemId, file.originalname);
      const putObj = new PutObjectCommand({
        Bucket: this.awsConfig.bucketName,
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      });
      await this.s3Client.send(putObj);
      return filePath;
    } catch (e) {
      // todo logger
      console.log(e);
      // this.logger.error(error);
    }
  }

  public async deleteFile(filePath: string): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.awsConfig.bucketName,
          Key: filePath,
        }),
      );
    } catch (e) {
      // todo logger
      // this.logger.error(error);
    }
  }

  private buildPath(
    itemType: ContentType,
    itemId: string,
    fileName: string,
  ): string {
    return `${itemType}/${itemId}/${randomUUID()}${path.extname(fileName)}`;
  }
}
