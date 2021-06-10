import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { AuthGuard } from 'src/shared/guards/auth.guard';
import { BackendLogger } from '../logger/BackendLogger';
import { CreatelepsDto, FetchlepsDetailsDto } from './dto/leps-input.dto';
import { lepsService } from './leps.service';

@Controller('leps')
export class lepsController {
  private readonly log = new BackendLogger(lepsController.name);

  constructor(private readonly service: lepsService) {}

  @Post('/register')
  // @UseGuards(AuthGuard)
  public register(@Body() input: CreatelepsDto) {
    this.log.info('register.post_code_items');
    return this.service.createService(input);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchListByFilter(@Query() input?: FetchlepsDetailsDto) {
    this.log.info('fetchlepsListByFilter.body');
    return this.service.fetchByFilter(input);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query('id') id?: number) {
    this.log.info('fetchlepsDetails.body');
    return this.service.fetchDetails({ id });
  }
}
