import { HttpException, HttpStatus } from '@nestjs/common';

export namespace AuthExceptions {

  export class UserAlreadyExists extends HttpException {
    constructor() {
      super('User already exists!', HttpStatus.CONFLICT)
    }
  }

  export class InvalidCredentials extends HttpException {
    constructor() {
      super('Invalid credentials!', HttpStatus.FORBIDDEN)
    }
  }
}
