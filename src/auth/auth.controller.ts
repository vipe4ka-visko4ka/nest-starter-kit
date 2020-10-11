import { Body, Controller, Post } from '@nestjs/common';

import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('register')
  public register(@Body() user: AuthDto) {
    return this.authService.register(user);
  }
}
