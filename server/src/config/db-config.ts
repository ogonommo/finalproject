import { Quote } from '../data/entities/quote.entity';
import { ConnectionOptions } from 'typeorm';
export const config: ConnectionOptions = {
  type: 'mariadb',
  host: process.env.DBHOST,
  port: +process.env.DBPORT,
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DB_DB,
  entities: [Quote],

  migrationsRun: true,

  migrations: [__dirname + '../../**/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/data/migrations',
  },
};
