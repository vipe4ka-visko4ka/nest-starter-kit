import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiConfigService {

  constructor(private configService: ConfigService) {}

  get PORT(): number {
    return Number(this.configService.get('PORT'));
  }
}
