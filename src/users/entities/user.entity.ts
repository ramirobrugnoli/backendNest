import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AdminStatus } from '../constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column({ default: AdminStatus.USER })
  role?: AdminStatus;

  @Exclude()
  @Column()
  password: string;
}
