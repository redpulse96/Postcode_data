import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { InterfaceList, ResponseCodes, Status } from 'src/shared/constants';
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
    product_items: CreatePostCodesDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createPostCodeObj: any = {
        cty: product_items?.cty,
        lat: product_items?.lat,
        long: product_items?.long,
        ward: product_items?.ward,
        laua: product_items?.laua,
        lep: product_items?.lep,
        bid: product_items?.bid,
      };
      const [createError, product]: any[] = await executePromise(
        this.create(createPostCodeObj),
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
      if (post_codes_filter?.cty) {
        filter.id = post_codes_filter.cty;
      }
      if (post_codes_filter?.lat) {
        filter.name = post_codes_filter.lat;
      }
      if (post_codes_filter?.long) {
        filter.name = post_codes_filter.long;
      }
      if (post_codes_filter?.ward) {
        filter.brand = post_codes_filter.ward;
      }
      if (post_codes_filter?.laua) {
        filter.code = post_codes_filter.laua;
      }
      if (post_codes_filter?.lep) {
        filter.code = post_codes_filter.lep;
      }
      if (post_codes_filter?.bid) {
        filter.code = post_codes_filter.bid;
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
      postCodes.map((val: any) => {
        val.prices = [
          {
            name: val.tax_type,
            description: val.tax_type,
            type: val.tax_type,
            is_tax_applicable: val.is_tax_applicable,
            base_value: val.base_price,
            final_value: val.total_amount,
            status: Status.Active,
          },
        ];
      });

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
        this.findByIds([input.product_id]),
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
