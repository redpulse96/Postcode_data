import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { wards } from './wards.entity';
import { wardsService } from './wards.service';

describe('ProductsService', () => {
  let codeService: wardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([wards])],
      providers: [wardsService],
    }).compile();

    codeService = module.get<wardsService>(wardsService);
  });

  it('should be defined', () => {
    expect(codeService).toBeDefined();
  });
});
