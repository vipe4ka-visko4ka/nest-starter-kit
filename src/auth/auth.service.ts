import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserEntity } from 'src/user/user.entity';
import { ApiConfigService } from 'src/shared/config.service';
import { AuthDto } from './auth.dto';
import { AuthExceptions } from './auth.exceptions';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ApiConfigService,
    private readonly jwtService: JwtService
  ) {}

  public async register(authDto: AuthDto) {

    const isUserExists = await this.userRepository.findOne({ email: authDto.email });

    if (!!isUserExists) {
      throw new AuthExceptions.UserAlreadyExists;
    }

    authDto.password = await bcrypt.hash(authDto.password, this.configService.SALT_ROUNDS);

    const user = UserEntity.serealize(await this.userRepository.save(authDto));
    const token = this.jwtService.sign(classToPlain(user));

    return {
      user,
      token
    };
  }

  public async login(authDto: AuthDto) {

    const dbUser = await this.userRepository.findOne({ email: authDto.email });

    if (!dbUser) {
      throw new AuthExceptions.InvalidCredentials;
    }

    const passwordMatch = await bcrypt.compare(authDto.password, dbUser.password);

    if (!passwordMatch) {
      throw new AuthExceptions.InvalidCredentials;
    }

    const user = UserEntity.serealize(dbUser);
    const token = this.jwtService.sign(classToPlain(user));

    return {
      user,
      token
    };
  }
}
