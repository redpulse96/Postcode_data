import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { AuthGuard } from 'src/shared/guards/auth.guard';
import { BackendLogger } from '../logger/BackendLogger';
import {
  CreateEORA_usersDto,
  FetchEORA_usersDetailsDto,
} from './dto/EORA_users-input.dto';
import { EORA_usersService } from './EORA_users.service';

@Controller('EORA_users')
export class EORA_usersController {
  private readonly log = new BackendLogger(EORA_usersController.name);

  constructor(private readonly service: EORA_usersService) {}

  @Post('/register')
  // @UseGuards(AuthGuard)
  public register(@Body() input: CreateEORA_usersDto) {
    this.log.info('register.post_code_items');
    return this.service.createService(input);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchListByFilter(@Query() input?: FetchEORA_usersDetailsDto) {
    this.log.info('fetchEORA_usersListByFilter.body');
    this.log.info(input);
    return this.service.fetchByFilter(input);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query('id') id?: number) {
    this.log.info('fetchEORA_usersDetails.body');
    return this.service.fetchDetails({ id });
  }
}
