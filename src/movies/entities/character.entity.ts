import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Film } from './film.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  height: string;

  @Column()
  mass: string;

  @Column()
  hair_color: string;

  @Column()
  skin_color: string;

  @Column()
  eye_color: string;

  @Column()
  birth_year: string;

  @Column()
  gender: string;

  @Column()
  homeworld: string;

  @Column()
  url: string;

  constructor(partial: Partial<Character>) {
    Object.assign(this, partial);
  }
}
