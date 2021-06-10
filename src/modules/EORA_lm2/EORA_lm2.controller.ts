import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { AuthGuard } from 'src/shared/guards/auth.guard';
import { BackendLogger } from '../logger/BackendLogger';
import {
  CreateEORA_lm2sDto,
  FetchEORA_lm2DetailsDto,
} from './dto/EORA_lm2-input.dto';
import { EORA_lm2Service } from './EORA_lm2.service';

@Controller('EORA_lm2')
export class EORA_lm2Controller {
  private readonly log = new BackendLogger(EORA_lm2Controller.name);

  constructor(private readonly EORA_lm2Service: EORA_lm2Service) {}

  @Post('/register')
  // @UseGuards(AuthGuard)
  public register(@Body() input: CreateEORA_lm2sDto) {
    this.log.info('register.post_code_items');
    return this.EORA_lm2Service.createService(input);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchListByFilter(@Query() input?: FetchEORA_lm2DetailsDto) {
    this.log.info('fetchEORA_lm2ListByFilter.body');
    this.log.info(input);
    return this.EORA_lm2Service.fetchByFilter(input);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query() input: any) {
    this.log.info('fetchEORA_lm2Details.body');
    return this.EORA_lm2Service.fetchDetails({ id: input.id });
  }
}
