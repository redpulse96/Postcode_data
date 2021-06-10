import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
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
  public registerPostCode(
    @Body('account_id') account_id?: string,
    @Body('impact_account_id') impact_account_id?: string,
    @Body('voucher_id') voucher_id?: string,
    @Body('lm1_impact_value') lm1_impact_value?: number,
    @Body('lm1_creation_date') lm1_creation_date?: string,
    @Body('voucher_qty') voucher_qty?: number,
    @Body('claimed_user_id') claimed_user_id?: string,
    @Body('voucher_expiry_date') voucher_expiry_date?: Date,
    @Body('voucher_claim_date') voucher_claim_date?: Date,
    @Body('vouchers_remaining') vouchers_remaining?: number,
  ) {
    this.log.info('registerPostCode.post_code_items');
    const post_code_items: CreateEORA_lm1sDto = {
      account_id,
      impact_account_id,
      voucher_id,
      lm1_impact_value,
      lm1_creation_date,
      voucher_qty,
      claimed_user_id,
      voucher_expiry_date,
      voucher_claim_date,
      vouchers_remaining,
    };
    return this.EORA_lm1Service.createEORA_lm1(post_code_items);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchPostCodeListByFilter(
    @Query('id') id?: number,
    @Query('account_id') account_id?: string,
    @Query('impact_account_id') impact_account_id?: string,
    @Query('voucher_id') voucher_id?: string,
    @Query('lm1_impact_value') lm1_impact_value?: number,
    @Query('lm1_creation_date') lm1_creation_date?: string,
    @Query('voucher_qty') voucher_qty?: number,
    @Query('claimed_user_id') claimed_user_id?: string,
    @Query('voucher_expiry_date') voucher_expiry_date?: Date,
    @Query('voucher_claim_date') voucher_claim_date?: Date,
    @Query('vouchers_remaining') vouchers_remaining?: number,
  ) {
    const body: FetchEORA_lm1DetailsDto = {
      id,
      account_id,
      impact_account_id,
      voucher_id,
      lm1_impact_value,
      lm1_creation_date,
      voucher_qty,
      claimed_user_id,
      voucher_expiry_date,
      voucher_claim_date,
      vouchers_remaining,
    };
    this.log.info('fetchEORA_lm1ListByFilter.body');
    this.log.info(body);
    return this.EORA_lm1Service.fetchEORA_lm1ListByFilter(body);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Req() request: Request) {
    const { query }: any = request;
    this.log.info('fetchEORA_lm1Details.body');
    return this.EORA_lm1Service.fetchEORA_lm1Details({
      id: query.id,
    });
  }
}
