import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EORA_venuesController } from './EORA_venues.controller';
import { EORA_venues } from './EORA_venues.entity';
import { EORA_venuesService } from './EORA_venues.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([EORA_venues])],
  providers: [EORA_venuesService],
  controllers: [EORA_venuesController],
  exports: [EORA_venuesService],
})
export class EORA_venuesModule {}
