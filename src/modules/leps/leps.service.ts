import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { InterfaceList, ResponseCodes } from 'src/shared/constants';
import { Utils } from 'src/shared/util';
import { Repository } from 'typeorm';
import { DotenvService } from '../dotenv/dotenv.service';
import { BackendLogger } from '../logger/BackendLogger';
import { CreatelepsDto, FetchlepsDetailsDto } from './dto/leps-input.dto';
import { leps } from './leps.entity';
const { executePromise, returnCatchFunction } = Utils;

@Injectable()
export class lepsService extends BaseService<leps> {
  private readonly log = new BackendLogger(leps.name);

  constructor(
    @InjectRepository(leps)
    private readonly lepsRepo: Repository<leps>,
    private readonly dotenvService: DotenvService,
  ) {
    super(lepsRepo);
  }

  public async createService(
    input: CreatelepsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const createArr: any = { ...input };
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
    input: FetchlepsDetailsDto,
  ): Promise<InterfaceList.MethodResponse> {
    try {
      const filter: any = {};
      if (input?.id) {
        filter.id = input.id;
      }
      if (input?.lep_ref) {
        filter.lep_ref = input.lep_ref;
      }
      if (input?.lep_name) {
        filter.lep_name = input.lep_name;
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
