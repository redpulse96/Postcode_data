import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { InterfaceList, ResponseCodes } from 'src/shared/constants';
import { Utils } from 'src/shared/util';
import { Repository } from 'typeorm';
import { DotenvService } from '../dotenv/dotenv.service';
import { BackendLogger } from '../logger/BackendLogger';
import {
  CreateEORA_usersDto,
  FetchEORA_usersDetailsDto,
} from './dto/EORA_users-input.dto';
import { EORA_users } from './EORA_users.entity';
const { executePromise, returnCatchFunction } = Utils;

@Injectable()
export class EORA_usersService extends BaseService<EORA_users> {
  private readonly log = new BackendLogger(EORA_users.name);

  constructor(
    @InjectRepository(EORA_users)
    private readonly EORA_usersRepo: Repository<EORA_users>,
    private readonly dotenvService: DotenvService,
  ) {
    super(EORA_usersRepo);
  }

  public async createService(
    product_items: CreateEORA_usersDto[],
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createEORA_lm1Obj: any[] = [];
      product_items.forEach((val) => {
        createEORA_lm1Obj.push({
          user_id: val?.user_id,
          user_live_postcode: val?.user_live_postcode,
          user_work_postcode: val?.user_work_postcode,
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
    post_codes_filter: FetchEORA_usersDetailsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const filter: any = {};
      if (post_codes_filter?.id) {
        filter.id = post_codes_filter.id;
      }
      if (post_codes_filter?.user_id) {
        filter.account_id = post_codes_filter.user_id;
      }
      if (post_codes_filter?.user_live_postcode) {
        filter.impact_account_id = post_codes_filter.user_live_postcode;
      }
      if (post_codes_filter?.user_work_postcode) {
        filter.voucher_id = post_codes_filter.user_work_postcode;
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
