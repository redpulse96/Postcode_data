import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { lepsController } from './leps.controller';
import { leps } from './leps.entity';
import { lepsService } from './leps.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([leps])],
  providers: [lepsService],
  controllers: [lepsController],
  exports: [lepsService],
})
export class lepsModule {}
