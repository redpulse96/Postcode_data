import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EORA_lm3 } from './EORA_users.entity';
import { EORA_lm3Service } from './EORA_users.service';

describe('ProductsService', () => {
  let codeService: EORA_lm3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([EORA_lm3])],
      providers: [EORA_lm3Service],
    }).compile();

    codeService = module.get<EORA_lm3Service>(EORA_lm3Service);
  });

  it('should be defined', () => {
    expect(codeService).toBeDefined();
  });
});
