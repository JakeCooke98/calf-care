import { IsString, IsOptional, IsUrl, IsBoolean, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBreedDto {
  @ApiProperty({ example: 'Angus', description: 'Name of the breed' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'Black beef cattle breed', description: 'Description of the breed', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ example: '600-700', description: 'Average weight range in kg', required: false })
  @IsString()
  @IsOptional()
  avgWeight?: string;

  @ApiProperty({ example: true, description: 'Whether the breed is active', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 