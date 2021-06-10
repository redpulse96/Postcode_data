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
  public registerPostCode(@Body('input') input: any[]) {
    this.log.info('registerPostCode.post_code_items');
    const post_code_items: CreateEORA_lm3sDto[] = [...input];
    return this.service.createService(post_code_items);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchPostCodeListByFilter(
    @Query('account_id') account_id?: string,
    @Query('impact_account_id') impact_account_id?: string,
    @Query('voucher_id') voucher_id?: string,
    @Query('voucher_qty') voucher_qty?: number,
    @Query('lm3_impact_value') lm3_impact_value?: number,
    @Query('lm3_creation_date') lm3_creation_date?: Date,
  ) {
    const body: FetchEORA_lm3DetailsDto = {
      account_id,
      impact_account_id,
      voucher_id,
      voucher_qty,
      lm3_impact_value,
      lm3_creation_date,
    };
    this.log.info('fetchEORA_lm3ListByFilter.body');
    this.log.info(body);
    return this.service.fetchByFilter(body);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query('id') id?: number) {
    this.log.info('fetchEORA_lm3Details.body');
    return this.service.fetchDetails({ id });
  }
}
