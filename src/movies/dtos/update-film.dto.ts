import {
  IsString,
  IsNumber,
  IsArray,
  IsDate,
  IsUrl,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateFilmDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  episode_id?: number;

  @IsOptional()
  @IsString()
  opening_crawl?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsString()
  producer?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  release_date?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  characters?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  planets?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  starships?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  vehicles?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  species?: string[];

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  edited?: Date;

  @IsDate()
  @IsOptional()
  edited_user?: number;
}
