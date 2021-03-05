import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { InterfaceList, ResponseCodes } from 'src/shared/constants';
import { Utils } from 'src/shared/util';
import { Repository } from 'typeorm';
import { DotenvService } from '../dotenv/dotenv.service';
import { BackendLogger } from '../logger/BackendLogger';
import {
  CreatePostCodesDto,
  FetchPostCodeDetailsDto,
} from './dto/post-code-input.dto';
import { PostCodes } from './post-code.entity';
const { executePromise, returnCatchFunction } = Utils;

@Injectable()
export class PostCodeService extends BaseService<PostCodes> {
  private readonly log = new BackendLogger(PostCodeService.name);

  constructor(
    @InjectRepository(PostCodes)
    private readonly postCodesRepo: Repository<PostCodes>,
    private readonly dotenvService: DotenvService,
  ) {
    super(postCodesRepo);
  }

  public async createPostCode(
    product_items: CreatePostCodesDto[],
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createPostCodeObj: any[] = [];
      product_items.forEach((val) => {
        createPostCodeObj.push({
          postcode: val?.Pcds,
          cty: val?.cty,
          lat: val?.lat,
          long: val?.long,
          ward: val?.ward,
          laua: val?.laua,
          lep: val?.lep1,
          bid: val?.bid,
        });
      });
      const [createError, product]: any[] = await executePromise(
        this.createAll(createPostCodeObj),
      );
      if (createError) {
        this.log.error('createError', createError);
        return { response_code: ResponseCodes.SERVICE_UNAVAILABLE };
      } else if (!product) {
        this.log.info('!product');
        return { response_code: ResponseCodes.SERVER_ERROR };
      }
      this.log.info('product');
      this.log.debug(product);

      return {
        response_code: ResponseCodes.SUCCESS,
        data: { product },
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }

  public async fetchPostCodesListByFilter(
    post_codes_filter: FetchPostCodeDetailsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const filter: any = {};
      if (post_codes_filter?.id) {
        filter.id = post_codes_filter.id;
      }
      if (post_codes_filter?.Pcds) {
        filter.postcode = post_codes_filter.Pcds;
      }
      if (post_codes_filter?.cty) {
        filter.cty = post_codes_filter.cty;
      }
      if (post_codes_filter?.lat) {
        filter.lat = post_codes_filter.lat;
      }
      if (post_codes_filter?.long) {
        filter.long = post_codes_filter.long;
      }
      if (post_codes_filter?.ward) {
        filter.ward = post_codes_filter.ward;
      }
      if (post_codes_filter?.laua) {
        filter.laua = post_codes_filter.laua;
      }
      if (post_codes_filter?.lep1) {
        filter.lep = post_codes_filter.lep1;
      }
      if (post_codes_filter?.bid) {
        filter.bid = post_codes_filter.bid;
      }
      this.log.info('fetchPostCodesListByFilter.filter');
      this.log.debug(filter);
      const [postCodesError, postCodes]: any[] = await executePromise(
        this.findAll(filter),
      );
      if (postCodesError) {
        this.log.error('postCodesError', postCodesError);
        return { response_code: ResponseCodes.SERVICE_UNAVAILABLE };
      } else if (!postCodes?.length) {
        this.log.info('!postCodes?.length');
        this.log.info(postCodes);
        return { response_code: ResponseCodes.BAD_REQUEST };
      }
      this.log.info('postCodes');
      this.log.debug(postCodes);

      return {
        response_code: ResponseCodes.SUCCESSFUL_FETCH,
        data: { postCodes },
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }

  public async fetchPostCodeDetails(
    input: any,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const [postCodesError, postCodes]: any[] = await executePromise(
        this.findByIds([input.id]),
      );
      if (postCodesError) {
        this.log.error('postCodesError', postCodesError);
        return { response_code: ResponseCodes.SERVICE_UNAVAILABLE };
      } else if (!postCodes?.length) {
        this.log.info('!postCodes?.length');
        this.log.info(postCodes);
        return { response_code: ResponseCodes.BAD_REQUEST };
      }
      this.log.info('postCodes');
      this.log.debug(postCodes);
      const finalPostCodes: any = { ...postCodes[0] };

      return {
        response_code: ResponseCodes.SUCCESSFUL_FETCH,
        data: { ...finalPostCodes },
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }
}
