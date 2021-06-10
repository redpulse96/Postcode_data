import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EORA_lm3Controller } from './EORA_lm3.controller';
import { EORA_lm3 } from './EORA_lm3.entity';
import { EORA_lm3Service } from './EORA_lm3.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([EORA_lm3])],
  providers: [EORA_lm3Service],
  controllers: [EORA_lm3Controller],
  exports: [EORA_lm3Service],
})
export class EORA_lm3Module {}
