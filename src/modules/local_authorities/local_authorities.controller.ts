import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { AuthGuard } from 'src/shared/guards/auth.guard';
import { BackendLogger } from '../logger/BackendLogger';
import {
  Createlocal_authoritiesDto,
  Fetchlocal_authoritiesDetailsDto,
} from './dto/local_authorities-input.dto';
import { local_authoritiesService } from './local_authorities.service';

@Controller('local_authorities')
export class local_authoritiesController {
  private readonly log = new BackendLogger(local_authoritiesController.name);

  constructor(private readonly service: local_authoritiesService) {}

  @Post('/register')
  // @UseGuards(AuthGuard)
  public registerPostCode(@Body('input') input: any[]) {
    this.log.info('registerPostCode.post_code_items');
    const post_code_items: Createlocal_authoritiesDto[] = [...input];
    return this.service.createService(post_code_items);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchPostCodeListByFilter(
    @Query('id') id?: number,
    @Query('laua_ref') laua_ref?: string,
    @Query('laua_name') laua_name?: string,
  ) {
    const body: Fetchlocal_authoritiesDetailsDto = { id, laua_ref, laua_name };
    this.log.info('fetchlocal_authoritiesListByFilter.body');
    this.log.info(body);
    return this.service.fetchByFilter(body);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query('id') id?: number) {
    this.log.info('fetchlocal_authoritiesDetails.body');
    return this.service.fetchDetails({ id });
  }
}
