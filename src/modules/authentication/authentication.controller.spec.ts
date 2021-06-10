import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authenticationController } from './authentication.controller';
import { authentication } from './authentication.entity';

describe('authentication Controller', () => {
  let controller: authenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([authentication])],
      controllers: [authenticationController],
    }).compile();

    controller = module.get<authenticationController>(authenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
