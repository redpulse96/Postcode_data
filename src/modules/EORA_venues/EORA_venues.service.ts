import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { InterfaceList, ResponseCodes } from 'src/shared/constants';
import { Utils } from 'src/shared/util';
import { Repository } from 'typeorm';
import { DotenvService } from '../dotenv/dotenv.service';
import { BackendLogger } from '../logger/BackendLogger';
import {
  CreateEORA_venuesDto,
  FetchEORA_venuesDetailsDto,
} from './dto/EORA_venues-input.dto';
import { EORA_venues } from './EORA_venues.entity';
const { executePromise, returnCatchFunction } = Utils;

@Injectable()
export class EORA_venuesService extends BaseService<EORA_venues> {
  private readonly log = new BackendLogger(EORA_venues.name);

  constructor(
    @InjectRepository(EORA_venues)
    private readonly EORA_venuesRepo: Repository<EORA_venues>,
    private readonly dotenvService: DotenvService,
  ) {
    super(EORA_venuesRepo);
  }

  public async createService(
    product_items: CreateEORA_venuesDto[],
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createEORA_lm1Obj: any[] = [];
      product_items.forEach((val) => {
        createEORA_lm1Obj.push({
          venue_id: val?.venue_id,
          venue_postcode: val?.venue_postcode,
          account_id: val?.account_id,
          no_employees: val?.no_employees,
          culture_venue: val?.culture_venue,
          sport_venue: val?.sport_venue,
          high_street_venue: val?.high_street_venue,
          charity_venue: val?.charity_venue,
          family_venue: val?.family_venue,
          tourist_venue: val?.tourist_venue,
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
    post_codes_filter: FetchEORA_venuesDetailsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const filter: any = {};
      if (post_codes_filter?.id) {
        filter.id = post_codes_filter.id;
      }
      if (post_codes_filter?.venue_id) {
        filter.venue_id = post_codes_filter.venue_id;
      }
      if (post_codes_filter?.venue_postcode) {
        filter.venue_postcode = post_codes_filter.venue_postcode;
      }
      if (post_codes_filter?.account_id) {
        filter.account_id = post_codes_filter.account_id;
      }
      if (post_codes_filter?.no_employees) {
        filter.no_employees = post_codes_filter.no_employees;
      }
      if (post_codes_filter?.culture_venue) {
        filter.culture_venue = post_codes_filter.culture_venue;
      }
      if (post_codes_filter?.sport_venue) {
        filter.sport_venue = post_codes_filter.sport_venue;
      }
      if (post_codes_filter?.high_street_venue) {
        filter.high_street_venue = post_codes_filter.high_street_venue;
      }
      if (post_codes_filter?.charity_venue) {
        filter.charity_venue = post_codes_filter.charity_venue;
      }
      if (post_codes_filter?.family_venue) {
        filter.family_venue = post_codes_filter.family_venue;
      }
      if (post_codes_filter?.tourist_venue) {
        filter.tourist_venue = post_codes_filter.tourist_venue;
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
