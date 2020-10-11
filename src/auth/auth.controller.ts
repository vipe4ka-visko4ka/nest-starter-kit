import { Body, Controller, Post } from '@nestjs/common';

import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('register')
  public register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }

  @Post('login')
  public login(@Body() AuthDto: AuthDto) {
    return this.authService.login(AuthDto);
  }
}
