import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
// import { AuthGuard } from 'src/shared/guards/auth.guard';
import { BackendLogger } from '../logger/BackendLogger';
import {
  CreatePostCodesDto,
  FetchPostCodeDetailsDto,
} from './dto/post-code-input.dto';
import { PostCodeService } from './post-code.service';

@Controller('post-code')
export class PostCodesController {
  private readonly log = new BackendLogger(PostCodesController.name);

  constructor(private readonly postCodeService: PostCodeService) {}

  @Post('/register')
  // @UseGuards(AuthGuard)
  public registerPostCode(
    @Body('postcode') postcode: string,
    @Body('cty') cty: string,
    @Body('lat') lat: number,
    @Body('long') long: number,
    @Body('ward') ward: string,
    @Body('laua') laua: string,
    @Body('lep') lep: string,
    @Body('bid') bid: string,
  ) {
    this.log.info('registerPostCode.post_code_items');
    const post_code_items: CreatePostCodesDto = {
      postcode,
      cty,
      lat,
      long,
      ward,
      laua,
      lep,
      bid,
    };
    return this.postCodeService.createPostCode(post_code_items);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchPostCodeListByFilter(
    @Query('id') id?: string,
    @Query('postcode') postcode?: string,
    @Query('cty') cty?: string,
    @Query('lat') lat?: number,
    @Query('long') long?: number,
    @Query('ward') ward?: string,
    @Query('laua') laua?: string,
    @Query('lep') lep?: string,
    @Query('bid') bid?: string,
  ) {
    const body: FetchPostCodeDetailsDto = {
      id,
      postcode,
      cty,
      lat,
      long,
      ward,
      laua,
      lep,
      bid,
    };
    this.log.info('fetchPostCodeListByFilter.body');
    this.log.info(body);
    return this.postCodeService.fetchPostCodesListByFilter(body);
  }

  @Get('/fetch-postcode-details')
  // @UseGuards(AuthGuard)
  public fetchPostCodeDetails(@Req() request: Request) {
    const { user, query }: any = request;
    this.log.info('fetchPostCodeListByFilter.body');
    return this.postCodeService.fetchPostCodeDetails({
      user,
      product_id: query.product_id,
    });
  }
}
