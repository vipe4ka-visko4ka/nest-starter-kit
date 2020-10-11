import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/shared/base.entity';
import { IUser } from './user';

@Entity('user')
export class UserEntity extends BaseEntity implements IUser {

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;
}
