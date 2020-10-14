import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }

  @Post('login')
  public login(@Body() AuthDto: AuthDto) {
    return this.authService.login(AuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  public test(@Request() req) {
    return req.user;
  }
}
