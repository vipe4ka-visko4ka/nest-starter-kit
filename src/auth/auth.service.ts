import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from 'src/user/user.entity';
import { ApiConfigService } from 'src/shared/config.service';
import { AuthDto } from './auth.dto';
import { AuthExceptions } from './auth.exceptions';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private configService: ApiConfigService
  ) {}

  public async register(authDtop: AuthDto) {
    const isUserExists = await this.userRepository.findOne({ email: authDtop.email });

    if (!!isUserExists) {
      throw new AuthExceptions.UserAlreadyExists;
    }

    authDtop.password = await bcrypt.hash(authDtop.password, this.configService.SALT_ROUNDS);

    return (await this.userRepository.save(authDtop)).serealize();
  }

  public async login(authDto: AuthDto) {
    const user = await this.userRepository.findOne({ email: authDto.email });

    if (!user) {
      throw new AuthExceptions.InvalidCredentials;
    }

    const passwordMatch = await bcrypt.compare(authDto.password, user.password);

    if (!passwordMatch) {
      throw new AuthExceptions.InvalidCredentials;
    }

    return user.serealize();
  }
}
