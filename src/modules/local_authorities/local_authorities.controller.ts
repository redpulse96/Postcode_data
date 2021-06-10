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
  public register(@Body() input: Createlocal_authoritiesDto) {
    this.log.info('register.post_code_items');
    return this.service.createService(input);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchListByFilter(@Query() input?: Fetchlocal_authoritiesDetailsDto) {
    this.log.info('fetchlocal_authoritiesListByFilter.body');
    this.log.info(input);
    return this.service.fetchByFilter(input);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query('id') id?: number) {
    this.log.info('fetchlocal_authoritiesDetails.body');
    return this.service.fetchDetails({ id });
  }
}
