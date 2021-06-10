import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { AuthGuard } from 'src/shared/guards/auth.guard';
import { BackendLogger } from '../logger/BackendLogger';
import { CreatewardsDto, FetchwardsDetailsDto } from './dto/wards-input.dto';
import { wardsService } from './wards.service';

@Controller('wards')
export class wardsController {
  private readonly log = new BackendLogger(wardsController.name);

  constructor(private readonly service: wardsService) {}

  @Post('/register')
  // @UseGuards(AuthGuard)
  public registerPostCode(@Body('input') input: any[]) {
    this.log.info('registerPostCode.post_code_items');
    const post_code_items: CreatewardsDto[] = [...input];
    return this.service.createService(post_code_items);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchPostCodeListByFilter(
    @Query('id') id?: number,
    @Query('ward_ref') ward_ref?: string,
    @Query('ward_name') ward_name?: string,
  ) {
    const body: FetchwardsDetailsDto = { id, ward_ref, ward_name };
    this.log.info('fetchwardsListByFilter.body');
    this.log.info(body);
    return this.service.fetchByFilter(body);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query('id') id?: number) {
    this.log.info('fetchwardsDetails.body');
    return this.service.fetchDetails({ id });
  }
}
