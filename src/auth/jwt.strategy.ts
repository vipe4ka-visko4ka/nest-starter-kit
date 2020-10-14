import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/user/user.entity';
import { IUser } from 'src/user/user';
import { AuthExceptions } from './auth.exceptions';
import { ApiConfigService } from 'src/shared/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ApiConfigService
  ) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.SECRET_KEY
    });
  }

  public async validate(payload: IUser) {

    const user = await this.userRepository.findOne({ email: payload.email });

    if (!user) {
      throw new AuthExceptions.InvalidCredentials;
    }

    return user;
  }
}
