import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EROA_accountsController } from './EROA_accounts.controller';
import { EROA_accounts } from './EROA_accounts.entity';
import { EROA_accountsService } from './EROA_accounts.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([EROA_accounts])],
  providers: [EROA_accountsService],
  controllers: [EROA_accountsController],
  exports: [EROA_accountsService],
})
export class EROA_accountsModule {}
