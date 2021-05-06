import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppConfigModule } from '@/config/app/config.module';
import models from './models';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'mysql',
        replication: {
          read: [
            {
              host: configService.get('database').host,
            },
          ],
          write: {
            host: configService.get('database').host,
          },
        },
        port: +configService.get('database').port,
        username: configService.get('database').user,
        password: configService.get('database').password,
        database: configService.get('database').schema,
        models,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MysqlDatabaseProviderModule {}
