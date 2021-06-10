import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { local_authorities } from './local_authorities.entity';
import { local_authoritiesService } from './local_authorities.service';

describe('ProductsService', () => {
  let codeService: local_authoritiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([local_authorities])],
      providers: [local_authoritiesService],
    }).compile();

    codeService = module.get<local_authoritiesService>(
      local_authoritiesService,
    );
  });

  it('should be defined', () => {
    expect(codeService).toBeDefined();
  });
});
