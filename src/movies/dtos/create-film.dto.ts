import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'Title of the film' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Episode ID of the film' })
  @IsNumber()
  episode_id: number;

  @ApiProperty({ description: 'Opening crawl text of the film' })
  @IsString()
  opening_crawl: string;

  @ApiProperty({ description: 'Director of the film' })
  @IsString()
  director: string;

  @ApiProperty({ description: 'Producer of the film' })
  @IsString()
  producer: string;

  @ApiProperty({
    description: 'Release date of the film',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @Type(() => Date)
  release_date: Date;

  @ApiPropertyOptional({ description: 'Character URLs', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  character_urls?: string[];

  @ApiProperty({ description: 'Planets in the film', type: [String] })
  @IsArray()
  @IsString({ each: true })
  planets: string[];

  @ApiProperty({ description: 'Starships in the film', type: [String] })
  @IsArray()
  @IsString({ each: true })
  starships: string[];

  @ApiProperty({ description: 'Vehicles in the film', type: [String] })
  @IsArray()
  @IsString({ each: true })
  vehicles: string[];

  @ApiProperty({ description: 'Species in the film', type: [String] })
  @IsArray()
  @IsString({ each: true })
  species: string[];

  @ApiProperty({ description: 'URL of the film' })
  @IsUrl()
  url: string;

  @ApiPropertyOptional({
    description: 'Creation date of the film',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  created?: Date;
}
