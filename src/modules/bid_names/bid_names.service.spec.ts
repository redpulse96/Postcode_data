import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { bid_names } from './bid_names.entity';
import { bid_namesService } from './bid_names.service';

describe('ProductsService', () => {
  let codeService: bid_namesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([bid_names])],
      providers: [bid_namesService],
    }).compile();

    codeService = module.get<bid_namesService>(bid_namesService);
  });

  it('should be defined', () => {
    expect(codeService).toBeDefined();
  });
});
