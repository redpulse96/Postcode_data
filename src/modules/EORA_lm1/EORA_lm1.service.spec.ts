import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EORA_lm1 } from './EORA_lm1.entity';
import { EORA_lm1Service } from './EORA_lm1.service';

describe('ProductsService', () => {
  let codeService: EORA_lm1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([EORA_lm1])],
      providers: [EORA_lm1Service],
    }).compile();

    codeService = module.get<EORA_lm1Service>(EORA_lm1Service);
  });

  it('should be defined', () => {
    expect(codeService).toBeDefined();
  });
});
