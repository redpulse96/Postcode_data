import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { bid_namesController } from './bid_names.controller';
import { bid_names } from './bid_names.entity';
import { bid_namesService } from './bid_names.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([bid_names])],
  providers: [bid_namesService],
  controllers: [bid_namesController],
  exports: [bid_namesService],
})
export class bid_namesModule {}
