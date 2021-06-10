import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { InterfaceList, ResponseCodes } from 'src/shared/constants';
import { Utils } from 'src/shared/util';
import { Repository } from 'typeorm';
import { DotenvService } from '../dotenv/dotenv.service';
import { BackendLogger } from '../logger/BackendLogger';
import {
  CreateEROA_accountsDto,
  FetchEROA_accountsDetailsDto,
} from './dto/EROA_accounts-input.dto';
import { EROA_accounts } from './EROA_accounts.entity';
const { executePromise, returnCatchFunction } = Utils;

@Injectable()
export class EROA_accountsService extends BaseService<EROA_accounts> {
  private readonly log = new BackendLogger(EROA_accounts.name);

  constructor(
    @InjectRepository(EROA_accounts)
    private readonly EROA_accountsRepo: Repository<EROA_accounts>,
    private readonly dotenvService: DotenvService,
  ) {
    super(EROA_accountsRepo);
  }

  public async createService(
    input: CreateEROA_accountsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createEORA_lm1Obj: any = { ...input };
      const eoraAccount: any = await this.create(createEORA_lm1Obj);
      this.log.info('eoraAccount');
      this.log.debug(eoraAccount);

      return {
        response_code: ResponseCodes.SUCCESS,
        data: { ...eoraAccount },
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }

  public async fetchByFilter(
    input: FetchEROA_accountsDetailsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const filter: any = {};
      if (input?.id) {
        filter.id = input.id;
      }
      if (input?.account_id) {
        filter.account_id = input.account_id;
      }
      if (input?.account_postcode) {
        filter.account_postcode = input.account_postcode;
      }
      if (input?.no_employees) {
        filter.no_employees = input.no_employees;
      }
      if (input?.account_name) {
        filter.account_name = input.account_name;
      }
      if (input?.account_type) {
        filter.account_type = input.account_type;
      }
      if (input?.venue_account) {
        filter.venue_account = input.venue_account;
      }
      this.log.info('fetchPostCodesListByFilter.filter');
      this.log.debug(filter);
      const postCodes: any = await this.findAll(filter);
      if (!postCodes?.length) {
        this.log.info('!postCodes?.length');
        this.log.info(postCodes);
        return { response_code: ResponseCodes.BAD_REQUEST };
      }
      this.log.info('postCodes');
      this.log.debug(postCodes);

      return {
        response_code: ResponseCodes.SUCCESSFUL_FETCH,
        data: { ...postCodes },
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
