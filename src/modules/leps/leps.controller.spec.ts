import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { lepsController } from './leps.controller';
import { leps } from './leps.entity';

describe('leps Controller', () => {
  let controller: lepsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([leps])],
      controllers: [lepsController],
    }).compile();

    controller = module.get<lepsController>(lepsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
