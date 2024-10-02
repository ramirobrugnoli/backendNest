import {
  IsString,
  IsNumber,
  IsArray,
  IsDate,
  IsUrl,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFilmDto {
  @IsString()
  title: string;

  @IsNumber()
  episode_id: number;

  @IsString()
  opening_crawl: string;

  @IsString()
  director: string;

  @IsString()
  producer: string;

  @IsDate()
  @Type(() => Date)
  release_date: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  character_urls?: string[];

  @IsArray()
  @IsString({ each: true })
  planets: string[];

  @IsArray()
  @IsString({ each: true })
  starships: string[];

  @IsArray()
  @IsString({ each: true })
  vehicles: string[];

  @IsArray()
  @IsString({ each: true })
  species: string[];

  @IsUrl()
  url: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  created?: Date;
}
