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
    input: CreateEORA_venuesDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createEORA_lm1Obj: CreateEORA_venuesDto = { ...input };
      const eoraVenues: any = await this.create(createEORA_lm1Obj);
      this.log.info('eoraVenues');
      this.log.debug(eoraVenues);

      return {
        response_code: ResponseCodes.SUCCESS,
        data: { eoraVenues },
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }

  public async fetchByFilter(
    input: FetchEORA_venuesDetailsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const filter: any = {};
      if (input?.id) {
        filter.id = input.id;
      }
      if (input?.venue_id) {
        filter.venue_id = input.venue_id;
      }
      if (input?.venue_postcode) {
        filter.venue_postcode = input.venue_postcode;
      }
      if (input?.account_id) {
        filter.account_id = input.account_id;
      }
      if (input?.no_employees) {
        filter.no_employees = input.no_employees;
      }
      if (input?.culture_venue) {
        filter.culture_venue = input.culture_venue;
      }
      if (input?.sport_venue) {
        filter.sport_venue = input.sport_venue;
      }
      if (input?.high_street_venue) {
        filter.high_street_venue = input.high_street_venue;
      }
      if (input?.charity_venue) {
        filter.charity_venue = input.charity_venue;
      }
      if (input?.family_venue) {
        filter.family_venue = input.family_venue;
      }
      if (input?.tourist_venue) {
        filter.tourist_venue = input.tourist_venue;
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
        data: [...postCodes],
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
