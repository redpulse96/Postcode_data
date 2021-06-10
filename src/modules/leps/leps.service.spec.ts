import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { leps } from './leps.entity';
import { lepsService } from './leps.service';

describe('ProductsService', () => {
  let codeService: lepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([leps])],
      providers: [lepsService],
    }).compile();

    codeService = module.get<lepsService>(lepsService);
  });

  it('should be defined', () => {
    expect(codeService).toBeDefined();
  });
});
