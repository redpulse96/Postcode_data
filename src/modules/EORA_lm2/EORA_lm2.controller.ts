import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
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
  public registerPostCode(@Body('input') input: any[]) {
    this.log.info('registerPostCode.post_code_items');
    const post_code_items: CreateEORA_lm2sDto[] = [...input];
    return this.EORA_lm2Service.createEORA_lm2(post_code_items);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchPostCodeListByFilter(
    @Query('id') id?: number,
    @Query('redeemed_user_id') redeemed_user_id?: string,
    @Query('voucher_id') voucher_id?: string,
    @Query('redeemed_venue_id') redeemed_venue_id?: string,
    @Query('lm2_transaction_amount') lm2_transaction_amount?: number,
    @Query('first_visit_outside_EORA') first_visit_outside_EORA?: string,
  ) {
    const body: FetchEORA_lm2DetailsDto = {
      id,
      redeemed_user_id,
      voucher_id,
      redeemed_venue_id,
      lm2_transaction_amount,
      first_visit_outside_EORA,
    };
    this.log.info('fetchEORA_lm2ListByFilter.body');
    this.log.info(body);
    return this.EORA_lm2Service.fetchEORA_lm2ListByFilter(body);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Req() request: Request) {
    const { query }: any = request;
    this.log.info('fetchEORA_lm2Details.body');
    return this.EORA_lm2Service.fetchEORA_lm2Details({
      id: query.id,
    });
  }
}
