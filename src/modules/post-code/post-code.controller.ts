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
  public registerPostCode(@Body('input') input: any[]) {
    this.log.info('registerPostCode.post_code_items');
    const post_code_items: CreatePostCodesDto[] = [...input];
    return this.postCodeService.createPostCode(post_code_items);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchPostCodeListByFilter(
    @Query('id') id?: string,
    @Query('Pcds') Pcds?: string,
    @Query('cty') cty?: string,
    @Query('lat') lat?: number,
    @Query('long') long?: number,
    @Query('ward') ward?: string,
    @Query('laua') laua?: string,
    @Query('lep1') lep1?: string,
    @Query('bid') bid?: string,
  ) {
    const body: FetchPostCodeDetailsDto = {
      id,
      Pcds,
      cty,
      lat,
      long,
      ward,
      laua,
      lep1,
      bid,
    };
    this.log.info('fetchPostCodeListByFilter.body');
    this.log.info(body);
    return this.postCodeService.fetchPostCodesListByFilter(body);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Req() request: Request) {
    const { query }: any = request;
    this.log.info('fetchPostCodeListByFilter.body');
    return this.postCodeService.fetchPostCodeDetails({
      id: query.id,
    });
  }
}
