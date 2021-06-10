import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EORA_lm2 } from './EORA_lm2.entity';
import { EORA_lm2Service } from './EORA_lm2.service';

describe('ProductsService', () => {
  let codeService: EORA_lm2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([EORA_lm2])],
      providers: [EORA_lm2Service],
    }).compile();

    codeService = module.get<EORA_lm2Service>(EORA_lm2Service);
  });

  it('should be defined', () => {
    expect(codeService).toBeDefined();
  });
});
