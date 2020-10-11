import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'shared/base.entity';

@Entity('user')
export class User extends BaseEntity {

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;
}
