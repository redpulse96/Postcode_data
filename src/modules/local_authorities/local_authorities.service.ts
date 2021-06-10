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
const { returnCatchFunction } = Utils;

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
    input: Createlocal_authoritiesDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createArr: Createlocal_authoritiesDto = { ...input };
      const product: any = await this.create(createArr);
      this.log.info('product');
      this.log.debug(product);

      return {
        response_code: ResponseCodes.SUCCESS,
        data: { ...product },
      };
    } catch (error) {
      return returnCatchFunction(error);
    }
  }

  public async fetchByFilter(
    input: Fetchlocal_authoritiesDetailsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const filter: any = {};
      if (input?.id) {
        filter.id = input.id;
      }
      if (input?.laua_ref) {
        filter.laua_ref = input.laua_ref;
      }
      if (input?.laua_name) {
        filter.laua_name = input.laua_name;
      }
      this.log.info('fetchPostCodesListByFilter.filter');
      this.log.debug(filter);
      const postCodes: any[] = await this.findAll(filter);
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
