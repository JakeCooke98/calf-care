import { IsString, IsOptional, IsBoolean, IsNumber, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHealthStatusDto {
  @ApiProperty({ example: 'Healthy', description: 'Name of the health status' })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 'Animal is in good health with no issues', description: 'Description of the health status', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ example: 'green', description: 'Color code for the status', required: false })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ example: false, description: 'Whether this status requires attention', required: false })
  @IsBoolean()
  @IsOptional()
  requiresAttention?: boolean;

  @ApiProperty({ example: false, description: 'Whether this status is an emergency', required: false })
  @IsBoolean()
  @IsOptional()
  isEmergency?: boolean;

  @ApiProperty({ example: true, description: 'Whether the status is active', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: 1, description: 'Display order of the status', required: false })
  @IsNumber()
  @IsOptional()
  displayOrder?: number;
} 