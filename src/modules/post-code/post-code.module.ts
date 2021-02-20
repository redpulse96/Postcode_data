import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCodesController } from './post-code.controller';
import { PostCodes } from './post-code.entity';
import { PostCodeService } from './post-code.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PostCodes])],
  providers: [PostCodeService],
  controllers: [PostCodesController],
  exports: [PostCodeService],
})
export class PostCodesModule {}
