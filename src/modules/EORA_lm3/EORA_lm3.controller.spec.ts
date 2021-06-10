import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EORA_lm3Controller } from './EORA_lm3.controller';
import { EORA_lm3 } from './EORA_lm3.entity';

describe('EORA_lm3 Controller', () => {
  let controller: EORA_lm3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([EORA_lm3])],
      controllers: [EORA_lm3Controller],
    }).compile();

    controller = module.get<EORA_lm3Controller>(EORA_lm3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
