import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { InterfaceList, ResponseCodes } from 'src/shared/constants';
import { Utils } from 'src/shared/util';
import { Repository } from 'typeorm';
import { DotenvService } from '../dotenv/dotenv.service';
import { BackendLogger } from '../logger/BackendLogger';
import { authentication } from './authentication.entity';
import {
  CreateauthenticationDto,
  FetchauthenticationDetailsDto,
} from './dto/authentication-input.dto';
const { executePromise, returnCatchFunction } = Utils;

@Injectable()
export class authenticationService extends BaseService<authentication> {
  private readonly log = new BackendLogger(authentication.name);

  constructor(
    @InjectRepository(authentication)
    private readonly authenticationRepo: Repository<authentication>,
    private readonly dotenvService: DotenvService,
  ) {
    super(authenticationRepo);
  }

  public async createService(
    product_items: CreateauthenticationDto[],
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createArr: any[] = [];
      product_items.forEach((val) => {
        createArr.push({
          user_id: val?.user_id,
          password: val?.password,
          username: val?.username,
          user_type: val?.user_type,
          access_to: val?.access_to,
        });
      });
      const [createError, product]: any[] = await executePromise(
        this.createAll(createArr),
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
    post_codes_filter: FetchauthenticationDetailsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const filter: any = {};
      if (post_codes_filter?.id) {
        filter.id = post_codes_filter.id;
      }
      if (post_codes_filter?.user_id) {
        filter.user_id = post_codes_filter.user_id;
      }
      if (post_codes_filter?.password) {
        filter.password = post_codes_filter.password;
      }
      if (post_codes_filter?.username) {
        filter.username = post_codes_filter.username;
      }
      if (post_codes_filter?.user_type) {
        filter.user_type = post_codes_filter.user_type;
      }
      if (post_codes_filter?.access_to) {
        filter.access_to = post_codes_filter.access_to;
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
