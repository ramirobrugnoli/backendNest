import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Character } from './character.entity';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  episode_id: number;

  @Column('text')
  opening_crawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column()
  release_date: Date;

  @ManyToMany(() => Character)
  @JoinTable()
  characters: Character[];

  @Column('simple-array')
  planets: string[];

  @Column('simple-array')
  starships: string[];

  @Column('simple-array')
  vehicles: string[];

  @Column('simple-array')
  species: string[];

  @Column()
  url: string;

  @Column()
  created: Date;

  @Column()
  edited: Date;

  constructor(partial: Partial<Film>) {
    Object.assign(this, partial);
  }
}
