import { IsString, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmSettingsDto {
  @ApiProperty({ example: 'Green Valley Dairy', description: 'Name of the farm' })
  @IsString()
  @MaxLength(100)
  farmName: string;

  @ApiProperty({ example: 'Middlefield, OH', description: 'Location of the farm', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  farmLocation?: string;

  @ApiProperty({ example: 'America/New_York', description: 'Time zone of the farm' })
  @IsString()
  @IsOptional()
  timeZone?: string;

  @ApiProperty({ example: 'USD', description: 'Currency used by the farm' })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ example: 'https://example.com/logo.png', description: 'URL to the farm logo', required: false })
  @IsUrl()
  @IsOptional()
  logoUrl?: string;

  @ApiProperty({ example: 'Family-owned dairy farm established in 1975', description: 'Description of the farm', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;
} 