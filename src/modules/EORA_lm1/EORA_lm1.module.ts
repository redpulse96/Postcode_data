import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EORA_lm1Controller } from './EORA_lm1.controller';
import { EORA_lm1 } from './EORA_lm1.entity';
import { EORA_lm1Service } from './EORA_lm1.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([EORA_lm1])],
  providers: [EORA_lm1Service],
  controllers: [EORA_lm1Controller],
  exports: [EORA_lm1Service],
})
export class EORA_lm1Module {}
