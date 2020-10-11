import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/user.entity';
import { IUser } from 'src/user/user';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  public async register(user: IUser) {
    const isUserExists = await this.userRepository.findOne({ email: user.email });

    if (!!isUserExists) {
      throw new HttpException('User already exists!', HttpStatus.CONFLICT);
    }

    return this.userRepository.save(user);
  }
}
