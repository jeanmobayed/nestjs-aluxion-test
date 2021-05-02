import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, NODE_ENV } = process.env;

const port: number = parseInt(<string>DB_PORT, 10) || 5432;

export default{
  type: 'postgres',
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  username: DB_USER,
  port,
  synchronize: NODE_ENV === 'development',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
} as TypeOrmModuleOptions;

