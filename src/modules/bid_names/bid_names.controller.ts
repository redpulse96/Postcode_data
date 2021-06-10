import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { AuthGuard } from 'src/shared/guards/auth.guard';
import { BackendLogger } from '../logger/BackendLogger';
import { bid_namesService } from './bid_names.service';
import {
  Createbid_namesDto,
  Fetchbid_namesDetailsDto,
} from './dto/bid_names-input.dto';

@Controller('bid_names')
export class bid_namesController {
  private readonly log = new BackendLogger(bid_namesController.name);

  constructor(private readonly service: bid_namesService) {}

  @Post('/register')
  // @UseGuards(AuthGuard)
  public registerPostCode(@Body('input') input: any[]) {
    this.log.info('registerPostCode.post_code_items');
    const post_code_items: Createbid_namesDto[] = [...input];
    return this.service.createService(post_code_items);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchPostCodeListByFilter(
    @Query('id') id?: number,
    @Query('bid_name') bid_name?: string,
  ) {
    const body: Fetchbid_namesDetailsDto = { id, bid_name };
    this.log.info('fetchbid_namesListByFilter.body');
    this.log.info(body);
    return this.service.fetchByFilter(body);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query('id') id?: number) {
    this.log.info('fetchbid_namesDetails.body');
    return this.service.fetchDetails({ id });
  }
}
