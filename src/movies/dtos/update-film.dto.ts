import { ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional({ description: 'Title of the film' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Episode ID of the film' })
  @IsOptional()
  @IsNumber()
  episode_id?: number;

  @ApiPropertyOptional({ description: 'Opening crawl text of the film' })
  @IsOptional()
  @IsString()
  opening_crawl?: string;

  @ApiPropertyOptional({ description: 'Director of the film' })
  @IsOptional()
  @IsString()
  director?: string;

  @ApiPropertyOptional({ description: 'Producer of the film' })
  @IsOptional()
  @IsString()
  producer?: string;

  @ApiPropertyOptional({
    description: 'Release date of the film',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  release_date?: Date;

  @ApiPropertyOptional({ description: 'Character URLs', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  characters?: string[];

  @ApiPropertyOptional({ description: 'Planets in the film', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  planets?: string[];

  @ApiPropertyOptional({ description: 'Starships in the film', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  starships?: string[];

  @ApiPropertyOptional({ description: 'Vehicles in the film', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  vehicles?: string[];

  @ApiPropertyOptional({ description: 'Species in the film', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  species?: string[];

  @ApiPropertyOptional({ description: 'URL of the film' })
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiPropertyOptional({
    description: 'Edit date of the film',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  edited?: Date;

  @ApiPropertyOptional({ description: 'User who edited the film' })
  @IsOptional()
  edited_user?: number;
}
