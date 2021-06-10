import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { AuthGuard } from 'src/shared/guards/auth.guard';
import { BackendLogger } from '../logger/BackendLogger';
import {
  CreateEROA_accountsDto,
  FetchEROA_accountsDetailsDto,
} from './dto/EROA_accounts-input.dto';
import { EROA_accountsService } from './EROA_accounts.service';

@Controller('EROA_accounts')
export class EROA_accountsController {
  private readonly log = new BackendLogger(EROA_accountsController.name);

  constructor(private readonly service: EROA_accountsService) {}

  @Post('/register')
  // @UseGuards(AuthGuard)
  public registerPostCode(@Body('input') input: any[]) {
    this.log.info('registerPostCode.post_code_items');
    const post_code_items: CreateEROA_accountsDto[] = [...input];
    return this.service.createService(post_code_items);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchPostCodeListByFilter(
    @Query('id') id?: number,
    @Query('account_id') account_id?: string,
    @Query('account_postcode') account_postcode?: string,
    @Query('no_employees') no_employees?: number,
    @Query('account_name') account_name?: string,
    @Query('account_type') account_type?: string,
    @Query('venue_account') venue_account?: number,
  ) {
    const body: FetchEROA_accountsDetailsDto = {
      id,
      account_id,
      account_postcode,
      no_employees,
      account_name,
      account_type,
      venue_account,
    };
    this.log.info('fetchEROA_accountsListByFilter.body');
    this.log.info(body);
    return this.service.fetchByFilter(body);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query('id') id?: number) {
    this.log.info('fetchEROA_accountsDetails.body');
    return this.service.fetchDetails({ id });
  }
}
