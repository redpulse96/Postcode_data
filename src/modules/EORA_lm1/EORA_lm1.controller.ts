import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { AuthGuard } from 'src/shared/guards/auth.guard';
import { BackendLogger } from '../logger/BackendLogger';
import {
  CreateEORA_lm1sDto,
  FetchEORA_lm1DetailsDto,
} from './dto/EORA_lm1-input.dto';
import { EORA_lm1Service } from './EORA_lm1.service';

@Controller('EORA_lm1')
export class EORA_lm1Controller {
  private readonly log = new BackendLogger(EORA_lm1Controller.name);

  constructor(private readonly EORA_lm1Service: EORA_lm1Service) {}

  @Post('/register')
  // @UseGuards(AuthGuard)
  public register(@Body() input?: CreateEORA_lm1sDto) {
    this.log.info('register.post_code_items');
    this.log.info(input);
    return this.EORA_lm1Service.createService(input);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchListByFilter(@Query() input?: FetchEORA_lm1DetailsDto) {
    this.log.info('fetchEORA_lm1ListByFilter.body');
    this.log.info(input);
    return this.EORA_lm1Service.fetchByFilter(input);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query() input: any) {
    this.log.info('fetchEORA_lm1Details.body');
    return this.EORA_lm1Service.fetchDetails({ id: input.id });
  }
}
