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
const { returnCatchFunction } = Utils;

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
    input: CreateEORA_lm3sDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createEORA_lm1Obj: any = { ...input };
      const lm3Resp: any = await this.create(createEORA_lm1Obj);
      this.log.info('lm3Resp');
      this.log.debug(lm3Resp);

      return {
        response_code: ResponseCodes.SUCCESS,
        data: { ...lm3Resp },
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }

  public async fetchByFilter(
    input: FetchEORA_lm3DetailsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const filter: any = {};
      if (input?.id) {
        filter.id = input.id;
      }
      if (input?.account_id) {
        filter.account_id = input.account_id;
      }
      if (input?.impact_account_id) {
        filter.impact_account_id = input.impact_account_id;
      }
      if (input?.voucher_id) {
        filter.voucher_id = input.voucher_id;
      }
      if (input?.voucher_qty) {
        filter.voucher_qty = input.voucher_qty;
      }
      if (input?.lm3_impact_value) {
        filter.lm3_impact_value = input.lm3_impact_value;
      }
      if (input?.lm3_creation_date) {
        filter.lm3_creation_date = input.lm3_creation_date;
      }
      this.log.info('fetchPostCodesListByFilter.filter');
      this.log.debug(filter);
      const lm3Resp: any = await this.findAll(filter);
      if (!lm3Resp?.length) {
        this.log.info('!lm3Resp?.length');
        this.log.info(lm3Resp);
        return { response_code: ResponseCodes.BAD_REQUEST };
      }
      this.log.info('lm3Resp');
      this.log.debug(lm3Resp);

      return {
        response_code: ResponseCodes.SUCCESSFUL_FETCH,
        data: [...lm3Resp],
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }

  public async fetchDetails(id: any): Promise<InterfaceList.MethodResponse> {
    try {
      const lm3Resp: any = await this.findByIds([id]);
      if (!lm3Resp?.length) {
        this.log.info('!lm3Resp?.length');
        this.log.info(lm3Resp);
        return { response_code: ResponseCodes.BAD_REQUEST };
      }
      this.log.info('lm3Resp');
      this.log.debug(lm3Resp);
      const finalPostCodes: any = lm3Resp[0];

      return {
        response_code: ResponseCodes.SUCCESSFUL_FETCH,
        data: { ...finalPostCodes },
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }
}
