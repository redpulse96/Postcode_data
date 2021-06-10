import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EORA_lm1Controller } from './EORA_lm1.controller';
import { EORA_lm1 } from './EORA_lm1.entity';

describe('EORA_lm1 Controller', () => {
  let controller: EORA_lm1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([EORA_lm1])],
      controllers: [EORA_lm1Controller],
    }).compile();

    controller = module.get<EORA_lm1Controller>(EORA_lm1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
