import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authentication } from './authentication.entity';
import { authenticationService } from './authentication.service';

describe('ProductsService', () => {
  let codeService: authenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([authentication])],
      providers: [authenticationService],
    }).compile();

    codeService = module.get<authenticationService>(authenticationService);
  });

  it('should be defined', () => {
    expect(codeService).toBeDefined();
  });
});
