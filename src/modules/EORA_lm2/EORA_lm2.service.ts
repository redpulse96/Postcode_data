import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { InterfaceList, ResponseCodes } from 'src/shared/constants';
import { Utils } from 'src/shared/util';
import { Repository } from 'typeorm';
import { DotenvService } from '../dotenv/dotenv.service';
import { BackendLogger } from '../logger/BackendLogger';
import {
  CreateEORA_lm2sDto,
  FetchEORA_lm2DetailsDto,
} from './dto/EORA_lm2-input.dto';
import { EORA_lm2 } from './EORA_lm2.entity';
const { executePromise, returnCatchFunction } = Utils;

@Injectable()
export class EORA_lm2Service extends BaseService<EORA_lm2> {
  private readonly log = new BackendLogger(EORA_lm2.name);

  constructor(
    @InjectRepository(EORA_lm2)
    private readonly EORA_lm2Repo: Repository<EORA_lm2>,
    private readonly dotenvService: DotenvService,
  ) {
    super(EORA_lm2Repo);
  }

  public async createEORA_lm2(
    product_items: CreateEORA_lm2sDto[],
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createEORA_lm1Obj: any[] = [];
      product_items.forEach((val) => {
        createEORA_lm1Obj.push({
          redeemed_user_id: val?.redeemed_user_id,
          voucher_id: val?.voucher_id,
          redeemed_venue_id: val?.redeemed_venue_id,
          lm2_transaction_amount: val?.lm2_transaction_amount,
          first_visit_outside_EORA: val?.first_visit_outside_EORA,
        });
      });
      const [createError, product]: any[] = await executePromise(
        this.createAll(createEORA_lm1Obj),
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

  public async fetchEORA_lm2ListByFilter(
    post_codes_filter: FetchEORA_lm2DetailsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const filter: any = {};
      if (post_codes_filter?.id) {
        filter.id = post_codes_filter.id;
      }
      if (post_codes_filter?.redeemed_user_id) {
        filter.redeemed_user_id = post_codes_filter.redeemed_user_id;
      }
      if (post_codes_filter?.voucher_id) {
        filter.voucher_id = post_codes_filter.voucher_id;
      }
      if (post_codes_filter?.redeemed_venue_id) {
        filter.redeemed_venue_id = post_codes_filter.redeemed_venue_id;
      }
      if (post_codes_filter?.lm2_transaction_amount) {
        filter.lm2_transaction_amount =
          post_codes_filter.lm2_transaction_amount;
      }
      if (post_codes_filter?.first_visit_outside_EORA) {
        filter.first_visit_outside_EORA =
          post_codes_filter.first_visit_outside_EORA;
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

  public async fetchEORA_lm2Details(
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
