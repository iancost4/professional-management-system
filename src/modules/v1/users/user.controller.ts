import { Body, Controller, HttpCode, Post, Get} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import { HttpResponse, HttpResponseToFront } from '@/utils/http-response';
import { UserService } from '@/modules/v1/users/user.service';
import { UserCreateDto } from '@/modules/v1/users/dto/userCreate.dto';

@ApiTags('v1/users')
@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create User
   *
   * @param {string} name - Name to identify User
   *
   * @returns {HttpResponseToFront}
   */
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, type: HttpResponseToFront })
  @ApiBody({ type: UserCreateDto })
  @Post('/')
  @HttpCode(201)
  async store(
    @Body() userCreateDto: UserCreateDto,
  ): Promise<HttpResponseToFront> {
    const user = await this.userService.store(userCreateDto);

    return HttpResponse.successfullyCreated(user).transformToReponse();
  }
}
