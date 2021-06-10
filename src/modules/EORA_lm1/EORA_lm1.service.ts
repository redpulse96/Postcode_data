import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { InterfaceList, ResponseCodes } from 'src/shared/constants';
import { Utils } from 'src/shared/util';
import { Repository } from 'typeorm';
import { DotenvService } from '../dotenv/dotenv.service';
import { BackendLogger } from '../logger/BackendLogger';
import {
  CreateEORA_lm1sDto,
  FetchEORA_lm1DetailsDto,
} from './dto/EORA_lm1-input.dto';
import { EORA_lm1 } from './EORA_lm1.entity';
const { executePromise, returnCatchFunction } = Utils;

@Injectable()
export class EORA_lm1Service extends BaseService<EORA_lm1> {
  private readonly log = new BackendLogger(EORA_lm1.name);

  constructor(
    @InjectRepository(EORA_lm1)
    private readonly EORA_lm1Repo: Repository<EORA_lm1>,
    private readonly dotenvService: DotenvService,
  ) {
    super(EORA_lm1Repo);
  }

  public async createService(
    product_items: CreateEORA_lm1sDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createEORA_lm1Obj: CreateEORA_lm1sDto = { ...product_items };
      const lm1Resp: any = await this.create(createEORA_lm1Obj);
      this.log.info('lm1Resp');
      this.log.debug(lm1Resp);

      return {
        response_code: ResponseCodes.SUCCESS,
        data: { ...lm1Resp },
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }

  public async fetchByFilter(
    post_codes_filter: FetchEORA_lm1DetailsDto,
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
      if (post_codes_filter?.lm1_impact_value) {
        filter.lm1_impact_value = post_codes_filter.lm1_impact_value;
      }
      if (post_codes_filter?.lm1_creation_date) {
        filter.lm1_creation_date = post_codes_filter.lm1_creation_date;
      }
      if (post_codes_filter?.voucher_qty) {
        filter.voucher_qty = post_codes_filter.voucher_qty;
      }
      if (post_codes_filter?.claimed_user_id) {
        filter.claimed_user_id = post_codes_filter.claimed_user_id;
      }
      if (post_codes_filter?.voucher_expiry_date) {
        filter.voucher_expiry_date = post_codes_filter.voucher_expiry_date;
      }
      if (post_codes_filter?.voucher_claim_date) {
        filter.voucher_claim_date = post_codes_filter.voucher_claim_date;
      }
      if (post_codes_filter?.vouchers_remaining) {
        filter.vouchers_remaining = post_codes_filter.vouchers_remaining;
      }
      this.log.info('fetchPostCodesListByFilter.filter');
      this.log.debug(filter);
      const lm1Resp: any[] = await this.findAll(filter);
      if (!lm1Resp?.length) {
        this.log.info('!lm1Resp?.length');
        this.log.info(lm1Resp);
        return { response_code: ResponseCodes.BAD_REQUEST };
      }
      this.log.info('lm1Resp');
      this.log.debug(lm1Resp);

      return {
        response_code: ResponseCodes.SUCCESSFUL_FETCH,
        data: [...lm1Resp],
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }

  public async fetchDetails(input: any): Promise<InterfaceList.MethodResponse> {
    try {
      const postCodes: any = await this.findByIds([input.id]);
      if (!postCodes?.length) {
        this.log.info('!postCodes?.length');
        this.log.info(postCodes);
        return { response_code: ResponseCodes.BAD_REQUEST };
      }
      this.log.info('postCodes');
      this.log.debug(postCodes);
      const finalPostCodes: any = postCodes[0];

      return {
        response_code: ResponseCodes.SUCCESSFUL_FETCH,
        data: { ...finalPostCodes },
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }
}
