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
  public registerPostCode(@Body('input') input: any[]) {
    this.log.info('registerPostCode.post_code_items');
    const post_code_items: CreatelepsDto[] = [...input];
    return this.service.createService(post_code_items);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchPostCodeListByFilter(
    @Query('id') id?: number,
    @Query('lep_ref') lep_ref?: string,
    @Query('lep_name') lep_name?: string,
  ) {
    const body: FetchlepsDetailsDto = { id, lep_ref, lep_name };
    this.log.info('fetchlepsListByFilter.body');
    this.log.info(body);
    return this.service.fetchByFilter(body);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query('id') id?: number) {
    this.log.info('fetchlepsDetails.body');
    return this.service.fetchDetails({ id });
  }
}
