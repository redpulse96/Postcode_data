import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { InterfaceList, ResponseCodes } from 'src/shared/constants';
import { Utils } from 'src/shared/util';
import { Repository } from 'typeorm';
import { DotenvService } from '../dotenv/dotenv.service';
import { BackendLogger } from '../logger/BackendLogger';
import {
  CreateEORA_lm3sDto,
  FetchEORA_lm3DetailsDto,
} from './dto/EORA_lm3-input.dto';
import { EORA_lm3 } from './EORA_lm3.entity';
const { executePromise, returnCatchFunction } = Utils;

@Injectable()
export class EORA_lm3Service extends BaseService<EORA_lm3> {
  private readonly log = new BackendLogger(EORA_lm3.name);

  constructor(
    @InjectRepository(EORA_lm3)
    private readonly EORA_lm3Repo: Repository<EORA_lm3>,
    private readonly dotenvService: DotenvService,
  ) {
    super(EORA_lm3Repo);
  }

  public async createService(
    product_items: CreateEORA_lm3sDto[],
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createEORA_lm1Obj: any[] = [];
      product_items.forEach((val) => {
        createEORA_lm1Obj.push({
          account_id: val?.account_id,
          impact_account_id: val?.impact_account_id,
          voucher_id: val?.voucher_id,
          voucher_qty: val?.voucher_qty,
          lm3_impact_value: val?.lm3_impact_value,
          lm3_creation_date: val?.lm3_creation_date,
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

  public async fetchByFilter(
    post_codes_filter: FetchEORA_lm3DetailsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const filter: any = {};
      if (post_codes_filter?.id) {
        filter.id = post_codes_filter.id;
      }
      if (post_codes_filter?.account_id) {
        filter.account_id = post_codes_filter.account_id;
      }
      if (post_codes_filter?.impact_account_id) {
        filter.impact_account_id = post_codes_filter.impact_account_id;
      }
      if (post_codes_filter?.voucher_id) {
        filter.voucher_id = post_codes_filter.voucher_id;
      }
      if (post_codes_filter?.voucher_qty) {
        filter.voucher_qty = post_codes_filter.voucher_qty;
      }
      if (post_codes_filter?.lm3_impact_value) {
        filter.lm3_impact_value = post_codes_filter.lm3_impact_value;
      }
      if (post_codes_filter?.lm3_creation_date) {
        filter.lm3_creation_date = post_codes_filter.lm3_creation_date;
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

  public async fetchDetails(input: any): Promise<InterfaceList.MethodResponse> {
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
