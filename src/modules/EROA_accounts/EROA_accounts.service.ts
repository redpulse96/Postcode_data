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
    product_items: CreateEROA_accountsDto[],
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createEORA_lm1Obj: any[] = [];
      product_items.forEach((val) => {
        createEORA_lm1Obj.push({
          account_id: val?.account_id,
          account_postcode: val?.account_postcode,
          no_employees: val?.no_employees,
          account_name: val?.account_name,
          account_type: val?.account_type,
          venue_account: val?.venue_account,
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
    post_codes_filter: FetchEROA_accountsDetailsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const filter: any = {};
      if (post_codes_filter?.id) {
        filter.id = post_codes_filter.id;
      }
      if (post_codes_filter?.account_id) {
        filter.account_id = post_codes_filter.account_id;
      }
      if (post_codes_filter?.account_postcode) {
        filter.account_postcode = post_codes_filter.account_postcode;
      }
      if (post_codes_filter?.no_employees) {
        filter.no_employees = post_codes_filter.no_employees;
      }
      if (post_codes_filter?.account_name) {
        filter.account_name = post_codes_filter.account_name;
      }
      if (post_codes_filter?.account_type) {
        filter.account_type = post_codes_filter.account_type;
      }
      if (post_codes_filter?.venue_account) {
        filter.venue_account = post_codes_filter.venue_account;
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
