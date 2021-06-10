import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { AuthGuard } from 'src/shared/guards/auth.guard';
import { BackendLogger } from '../logger/BackendLogger';
import { authenticationService } from './authentication.service';
import {
  CreateauthenticationDto,
  FetchauthenticationDetailsDto,
} from './dto/authentication-input.dto';

@Controller('authentication')
export class authenticationController {
  private readonly log = new BackendLogger(authenticationController.name);

  constructor(private readonly service: authenticationService) {}

  @Post('/register')
  // @UseGuards(AuthGuard)
  public registerPostCode(@Body('input') input: any[]) {
    this.log.info('registerPostCode.post_code_items');
    const post_code_items: CreateauthenticationDto[] = [...input];
    return this.service.createService(post_code_items);
  }

  @Get('/fetch-by-filter')
  // @UseGuards(AuthGuard)
  public fetchPostCodeListByFilter(
    @Query('id') id?: number,
    @Query('user_id') user_id?: string,
    @Query('password') password?: string,
    @Query('username') username?: string,
    @Query('user_type') user_type?: string,
    @Query('access_to') access_to?: string,
  ) {
    const body: FetchauthenticationDetailsDto = {
      id,
      user_id,
      password,
      username,
      user_type,
      access_to,
    };
    this.log.info('fetchauthenticationListByFilter.body');
    this.log.info(body);
    return this.service.fetchByFilter(body);
  }

  @Get('/fetch-details')
  // @UseGuards(AuthGuard)
  public fetchDetails(@Query('id') id?: number) {
    this.log.info('fetchauthenticationDetails.body');
    return this.service.fetchDetails({ id });
  }
}
