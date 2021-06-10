import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EORA_lm2Controller } from './EORA_lm2.controller';
import { EORA_lm2 } from './EORA_lm2.entity';
import { EORA_lm2Service } from './EORA_lm2.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([EORA_lm2])],
  providers: [EORA_lm2Service],
  controllers: [EORA_lm2Controller],
  exports: [EORA_lm2Service],
})
export class EORA_lm2Module {}
