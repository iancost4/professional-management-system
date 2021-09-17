import { Module } from '@nestjs/common';

import { AppService } from '@/app.service';
import { AppController } from '@/app.controller';
import { MysqlDatabaseProviderModule } from './providers/database/mysql/provider.module';

import { modules as modulesV1 } from '@/modules/v1/modules';

@Module({
  imports: [MysqlDatabaseProviderModule, ...modulesV1],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
