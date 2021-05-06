import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3333,
  database: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    user: process.env.MYSQL_USER || 'root',
    schema: process.env.MYSQL_DATABASE || 'app',
    password: process.env.MYSQL_PASSWORD || 'root123',
  },
});
