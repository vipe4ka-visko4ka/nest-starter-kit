import { Body, Controller, Post } from '@nestjs/common';

import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {

  @Post('register')
  public register(@Body() user: AuthDto) {
    return user;
  }
}
