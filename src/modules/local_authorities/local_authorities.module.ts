import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { local_authoritiesController } from './local_authorities.controller';
import { local_authorities } from './local_authorities.entity';
import { local_authoritiesService } from './local_authorities.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([local_authorities])],
  providers: [local_authoritiesService],
  controllers: [local_authoritiesController],
  exports: [local_authoritiesService],
})
export class local_authoritiesModule {}
