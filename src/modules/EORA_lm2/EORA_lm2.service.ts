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
const { returnCatchFunction } = Utils;

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

  public async createService(
    input: CreateEORA_lm2sDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createEORA_lm1Obj: any = { ...input };
      const product: any = await this.create(createEORA_lm1Obj);
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
    input: FetchEORA_lm2DetailsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const filter: any = {};
      if (input?.id) {
        filter.id = input.id;
      }
      if (input?.redeemed_user_id) {
        filter.redeemed_user_id = input.redeemed_user_id;
      }
      if (input?.voucher_id) {
        filter.voucher_id = input.voucher_id;
      }
      if (input?.redeemed_venue_id) {
        filter.redeemed_venue_id = input.redeemed_venue_id;
      }
      if (input?.lm2_transaction_amount) {
        filter.lm2_transaction_amount = input.lm2_transaction_amount;
      }
      if (input?.first_visit_outside_EORA) {
        filter.first_visit_outside_EORA = input.first_visit_outside_EORA;
      }
      this.log.info('fetchPostCodesListByFilter.filter');
      this.log.debug(filter);
      const lm2Resp: any = await this.findAll(filter);
      if (!lm2Resp?.length) {
        this.log.info('!lm2Resp?.length');
        this.log.info(lm2Resp);
        return { response_code: ResponseCodes.BAD_REQUEST };
      }
      this.log.info('lm2Resp');
      this.log.debug(lm2Resp);

      return {
        response_code: ResponseCodes.SUCCESSFUL_FETCH,
        data: [...lm2Resp],
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }

  public async fetchDetails(input: any): Promise<InterfaceList.MethodResponse> {
    try {
      const lm2Details: any = await this.findByIds([input.id]);
      if (!lm2Details?.length) {
        this.log.info('!lm2Details?.length');
        this.log.info(lm2Details);
        return { response_code: ResponseCodes.BAD_REQUEST };
      }
      this.log.info('lm2Details');
      this.log.debug(lm2Details);
      const finallm2Details: any = lm2Details[0];

      return {
        response_code: ResponseCodes.SUCCESSFUL_FETCH,
        data: { ...finallm2Details },
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }
}
