import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { wardsController } from './wards.controller';
import { wards } from './wards.entity';

describe('wards Controller', () => {
  let controller: wardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([wards])],
      controllers: [wardsController],
    }).compile();

    controller = module.get<wardsController>(wardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
