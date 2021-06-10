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
  public register(@Body() input: CreateEROA_accountsDto) {
    this.log.info('register.post_code_items');
    return this.service.createService(input);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchListByFilter(@Query() input?: FetchEROA_accountsDetailsDto) {
    this.log.info('fetchEROA_accountsListByFilter.body');
    this.log.info(input);
    return this.service.fetchByFilter(input);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query('id') id?: number) {
    this.log.info('fetchEROA_accountsDetails.body');
    return this.service.fetchDetails({ id });
  }
}
