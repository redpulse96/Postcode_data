import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EROA_accounts } from './EROA_accounts.entity';
import { EROA_accountsService } from './EROA_accounts.service';

describe('ProductsService', () => {
  let codeService: EROA_accountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([EROA_accounts])],
      providers: [EROA_accountsService],
    }).compile();

    codeService = module.get<EROA_accountsService>(EROA_accountsService);
  });

  it('should be defined', () => {
    expect(codeService).toBeDefined();
  });
});
