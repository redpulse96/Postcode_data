import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EORA_usersController } from './EORA_users.controller';
import { EORA_users } from './EORA_users.entity';
import { EORA_usersService } from './EORA_users.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([EORA_users])],
  providers: [EORA_usersService],
  controllers: [EORA_usersController],
  exports: [EORA_usersService],
})
export class EORA_usersModule {}
