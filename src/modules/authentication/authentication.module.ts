import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authenticationController } from './authentication.controller';
import { authentication } from './authentication.entity';
import { authenticationService } from './authentication.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([authentication])],
  providers: [authenticationService],
  controllers: [authenticationController],
  exports: [authenticationService],
})
export class authenticationModule {}
