import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { local_authoritiesController } from './local_authorities.controller';
import { local_authorities } from './local_authorities.entity';

describe('local_authorities Controller', () => {
  let controller: local_authoritiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([local_authorities])],
      controllers: [local_authoritiesController],
    }).compile();

    controller = module.get<local_authoritiesController>(
      local_authoritiesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
