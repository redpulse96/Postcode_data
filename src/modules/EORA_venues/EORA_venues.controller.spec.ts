import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EORA_venuesController } from './EORA_venues.controller';
import { EORA_venues } from './EORA_venues.entity';

describe('EORA_venues Controller', () => {
  let controller: EORA_venuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([EORA_venues])],
      controllers: [EORA_venuesController],
    }).compile();

    controller = module.get<EORA_venuesController>(EORA_venuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
