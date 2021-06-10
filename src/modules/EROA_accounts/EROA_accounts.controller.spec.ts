import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EROA_accountsController } from './EROA_accounts.controller';
import { EROA_accounts } from './EROA_accounts.entity';

describe('EROA_accounts Controller', () => {
  let controller: EROA_accountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([EROA_accounts])],
      controllers: [EROA_accountsController],
    }).compile();

    controller = module.get<EROA_accountsController>(EROA_accountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
