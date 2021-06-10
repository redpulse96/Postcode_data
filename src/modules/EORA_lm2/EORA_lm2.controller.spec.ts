import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EORA_lm2Controller } from './EORA_lm2.controller';
import { EORA_lm2 } from './EORA_lm2.entity';

describe('EORA_lm2 Controller', () => {
  let controller: EORA_lm2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([EORA_lm2])],
      controllers: [EORA_lm2Controller],
    }).compile();

    controller = module.get<EORA_lm2Controller>(EORA_lm2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
