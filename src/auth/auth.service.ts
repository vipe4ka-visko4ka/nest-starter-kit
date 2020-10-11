import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/user/user.entity';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  public async register(authDtop: AuthDto) {
    const isUserExists = await this.userRepository.findOne({ email: authDtop.email });

    if (!!isUserExists) {
      throw new HttpException('User already exists!', HttpStatus.CONFLICT);
    }

    return this.userRepository.save(authDtop);
  }

  public async login(authDto: AuthDto) {
    const user = await this.userRepository.findOne({ email: authDto.email });

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
