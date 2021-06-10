import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EORA_usersController } from './EORA_users.controller';
import { EORA_users } from './EORA_users.entity';

describe('EORA_users Controller', () => {
  let controller: EORA_usersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([EORA_users])],
      controllers: [EORA_usersController],
    }).compile();

    controller = module.get<EORA_usersController>(EORA_usersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
