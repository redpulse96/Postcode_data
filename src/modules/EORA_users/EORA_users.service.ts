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
    input: CreateEORA_usersDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createEORA_lm1Obj: any = { ...input };
      const eoraUsers: any = await this.create(createEORA_lm1Obj);

      this.log.info('eoraUsers');
      this.log.debug(eoraUsers);

      return {
        response_code: ResponseCodes.SUCCESS,
        data: { eoraUsers },
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }

  public async fetchByFilter(
    input: FetchEORA_usersDetailsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const filter: any = {};
      if (input?.id) {
        filter.id = input.id;
      }
      if (input?.user_id) {
        filter.account_id = input.user_id;
      }
      if (input?.user_live_postcode) {
        filter.impact_account_id = input.user_live_postcode;
      }
      if (input?.user_work_postcode) {
        filter.voucher_id = input.user_work_postcode;
      }
      this.log.info('fetchPostCodesListByFilter.filter');
      this.log.debug(filter);
      const eoraUsers: any = await this.findAll(filter);
      if (!eoraUsers?.length) {
        this.log.info('!eoraUsers?.length');
        this.log.info(eoraUsers);
        return { response_code: ResponseCodes.BAD_REQUEST };
      }
      this.log.info('eoraUsers');
      this.log.debug(eoraUsers);

      return {
        response_code: ResponseCodes.SUCCESSFUL_FETCH,
        data: { eoraUsers },
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }

  public async fetchDetails(input: any): Promise<InterfaceList.MethodResponse> {
    try {
      const eoraUserDetails: any[] = await this.findByIds([input.id]);
      if (!eoraUserDetails?.length) {
        this.log.info('!eoraUserDetails?.length');
        this.log.info(eoraUserDetails);
        return { response_code: ResponseCodes.BAD_REQUEST };
      }
      this.log.info('eoraUserDetails');
      this.log.debug(eoraUserDetails);
      const finalEoraUserDetails: any = eoraUserDetails[0];

      return {
        response_code: ResponseCodes.SUCCESSFUL_FETCH,
        data: { ...finalEoraUserDetails },
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }
}
