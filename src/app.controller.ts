import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get('version')
  public version(): string {
    return '1.0.0 [CORS]';
  }
}
