import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { AuthGuard } from 'src/shared/guards/auth.guard';
import { BackendLogger } from '../logger/BackendLogger';
import {
  CreateEORA_venuesDto,
  FetchEORA_venuesDetailsDto,
} from './dto/EORA_venues-input.dto';
import { EORA_venuesService } from './EORA_venues.service';

@Controller('EORA_venues')
export class EORA_venuesController {
  private readonly log = new BackendLogger(EORA_venuesController.name);

  constructor(private readonly service: EORA_venuesService) {}

  @Post('/register')
  // @UseGuards(AuthGuard)
  public register(@Body() input: CreateEORA_venuesDto) {
    this.log.info('registerPostCode.post_code_items');
    this.log.info(input);
    return this.service.createService(input);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchListByFilter(@Query() input?: FetchEORA_venuesDetailsDto) {
    this.log.info('fetchEORA_venuesListByFilter.body');
    this.log.info(input);
    return this.service.fetchByFilter(input);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query('id') id?: number) {
    this.log.info('fetchEORA_venuesDetails.body');
    return this.service.fetchDetails({ id });
  }
}
