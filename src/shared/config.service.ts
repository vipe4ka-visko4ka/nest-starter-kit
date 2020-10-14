import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

const ENV_KEYS = {
  PORT: 'PORT',
  SALT_ROUNDS: 'SALT_ROUNDS',
  SECRET_KEY: 'SECRET_KEY',
  EXPIRES_IN: 'EXPIRES_IN'
};

@Injectable()
export class ApiConfigService {

  constructor(private readonly configService: ConfigService) {}

  get PORT(): number {
    return Number(this.configService.get(ENV_KEYS.PORT));
  }

  get SALT_ROUNDS(): number {
    return Number(this.configService.get(ENV_KEYS.SALT_ROUNDS));
  }

  get SECRET_KEY(): string {
    return this.configService.get(ENV_KEYS.SECRET_KEY);
  }

  get EXPIRES_IN(): string {
    return this.configService.get(ENV_KEYS.EXPIRES_IN);
  }
}
