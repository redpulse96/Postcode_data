import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EORA_venues } from './EORA_venues.entity';
import { EORA_venuesService } from './EORA_venues.service';

describe('ProductsService', () => {
  let codeService: EORA_venuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([EORA_venues])],
      providers: [EORA_venuesService],
    }).compile();

    codeService = module.get<EORA_venuesService>(EORA_venuesService);
  });

  it('should be defined', () => {
    expect(codeService).toBeDefined();
  });
});
