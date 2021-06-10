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
  public registerPostCode(@Body('input') input: any[]) {
    this.log.info('registerPostCode.post_code_items');
    const post_code_items: CreateEORA_usersDto[] = [...input];
    return this.service.createService(post_code_items);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchPostCodeListByFilter(
    @Query('id') id?: number,
    @Query('user_id') user_id?: string,
    @Query('user_live_postcode') user_live_postcode?: string,
    @Query('user_work_postcode') user_work_postcode?: string,
  ) {
    const body: FetchEORA_usersDetailsDto = {
      id,
      user_id,
      user_live_postcode,
      user_work_postcode,
    };
    this.log.info('fetchEORA_usersListByFilter.body');
    this.log.info(body);
    return this.service.fetchByFilter(body);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query('id') id?: number) {
    this.log.info('fetchEORA_usersDetails.body');
    return this.service.fetchDetails({ id });
  }
}
