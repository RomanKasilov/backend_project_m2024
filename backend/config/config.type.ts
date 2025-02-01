export type ConfigurationType = {
  app: AppConfigType;
  database: DatabaseConfigType;
  redis: RedisConfigType;
  jwt: JwtConfig;
  aws: AwsConfigType;
};
export type AppConfigType = {
  port: number;
  host: string;
};
export type DatabaseConfigType = {
  port: number;
  host: string;
  user: string;
  name: string;
  password: string;
};
export type RedisConfigType = {
  host: string;
  port: number;
  password: string;
};
export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: number;
  refreshSecret: string;
  refreshExpiresIn: number;
};
export type AwsConfigType = {
  accessKey: string;
  secretKey: string;
  bucketName: string;
  region: string;
  ACL: string;
  endpoint: string;
};
