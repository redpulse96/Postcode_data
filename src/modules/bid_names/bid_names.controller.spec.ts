import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { bid_namesController } from './bid_names.controller';
import { bid_names } from './bid_names.entity';

describe('bid_names Controller', () => {
  let controller: bid_namesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([bid_names])],
      controllers: [bid_namesController],
    }).compile();

    controller = module.get<bid_namesController>(bid_namesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
