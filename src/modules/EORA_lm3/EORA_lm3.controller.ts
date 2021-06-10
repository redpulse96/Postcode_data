import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { AuthGuard } from 'src/shared/guards/auth.guard';
import { BackendLogger } from '../logger/BackendLogger';
import {
  CreateEORA_lm3sDto,
  FetchEORA_lm3DetailsDto,
} from './dto/EORA_lm3-input.dto';
import { EORA_lm3Service } from './EORA_lm3.service';

@Controller('EORA_lm3')
export class EORA_lm3Controller {
  private readonly log = new BackendLogger(EORA_lm3Controller.name);

  constructor(private readonly service: EORA_lm3Service) {}

  @Post('/register')
  // @UseGuards(AuthGuard)
  public register(@Body() input: CreateEORA_lm3sDto) {
    this.log.info('register.post_code_items');
    return this.service.createService(input);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchListByFilter(@Query() input?: FetchEORA_lm3DetailsDto) {
    this.log.info('fetchEORA_lm3ListByFilter.body');
    this.log.info(input);
    return this.service.fetchByFilter(input);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query() input?: any) {
    this.log.info('fetchEORA_lm3Details.body');
    const { id } = input;
    return this.service.fetchDetails(id);
  }
}
