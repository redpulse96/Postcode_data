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
  public registerPostCode(@Body('input') input: any[]) {
    this.log.info('registerPostCode.post_code_items');
    const post_code_items: CreateEORA_venuesDto[] = [...input];
    return this.service.createService(post_code_items);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchPostCodeListByFilter(
    @Query('id') id?: number,
    @Query('venue_id') venue_id?: string,
    @Query('venue_postcode') venue_postcode?: string,
    @Query('account_id') account_id?: string,
    @Query('no_employees') no_employees?: number,
    @Query('culture_venue') culture_venue?: number,
    @Query('sport_venue') sport_venue?: number,
    @Query('high_street_venue') high_street_venue?: number,
    @Query('charity_venue') charity_venue?: number,
    @Query('family_venue') family_venue?: number,
    @Query('tourist_venue') tourist_venue?: number,
  ) {
    const body: FetchEORA_venuesDetailsDto = {
      id,
      venue_id,
      venue_postcode,
      account_id,
      no_employees,
      culture_venue,
      sport_venue,
      high_street_venue,
      charity_venue,
      family_venue,
      tourist_venue,
    };
    this.log.info('fetchEORA_venuesListByFilter.body');
    this.log.info(body);
    return this.service.fetchByFilter(body);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query('id') id?: number) {
    this.log.info('fetchEORA_venuesDetails.body');
    return this.service.fetchDetails({ id });
  }
}
