import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCodesController } from './post-code.controller';
import { PostCodes } from './post-code.entity';

describe('Products Controller', () => {
  let controller: PostCodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([PostCodes])],
      controllers: [PostCodesController],
    }).compile();

    controller = module.get<PostCodesController>(PostCodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
