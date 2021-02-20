import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCodes } from './post-code.entity';
import { PostCodeService } from './post-code.service';

describe('ProductsService', () => {
  let postCodeService: PostCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([PostCodes])],
      providers: [PostCodeService],
    }).compile();

    postCodeService = module.get<PostCodeService>(PostCodeService);
  });

  it('should be defined', () => {
    expect(postCodeService).toBeDefined();
  });
});
