import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { InterfaceList, ResponseCodes } from 'src/shared/constants';
import { Utils } from 'src/shared/util';
import { Repository } from 'typeorm';
import { DotenvService } from '../dotenv/dotenv.service';
import { BackendLogger } from '../logger/BackendLogger';
import {
  Createlocal_authoritiesDto,
  Fetchlocal_authoritiesDetailsDto,
} from './dto/local_authorities-input.dto';
import { local_authorities } from './local_authorities.entity';
const { executePromise, returnCatchFunction } = Utils;

@Injectable()
export class local_authoritiesService extends BaseService<local_authorities> {
  private readonly log = new BackendLogger(local_authorities.name);

  constructor(
    @InjectRepository(local_authorities)
    private readonly local_authoritiesRepo: Repository<local_authorities>,
    private readonly dotenvService: DotenvService,
  ) {
    super(local_authoritiesRepo);
  }

  public async createService(
    product_items: Createlocal_authoritiesDto[],
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createArr: any[] = [];
      product_items.forEach((val) => {
        createArr.push({
          laua_ref: val?.laua_ref,
          laua_name: val?.laua_name,
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
    post_codes_filter: Fetchlocal_authoritiesDetailsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const filter: any = {};
      if (post_codes_filter?.id) {
        filter.id = post_codes_filter.id;
      }
      if (post_codes_filter?.laua_ref) {
        filter.laua_ref = post_codes_filter.laua_ref;
      }
      if (post_codes_filter?.laua_name) {
        filter.laua_name = post_codes_filter.laua_name;
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
