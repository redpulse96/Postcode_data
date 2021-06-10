import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { wardsController } from './wards.controller';
import { wards } from './wards.entity';
import { wardsService } from './wards.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([wards])],
  providers: [wardsService],
  controllers: [wardsController],
  exports: [wardsService],
})
export class wardsModule {}
