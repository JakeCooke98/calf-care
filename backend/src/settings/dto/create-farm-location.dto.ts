import { IsString, IsOptional, IsBoolean, IsNumber, MaxLength, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmLocationDto {
  @ApiProperty({ example: 'North Pasture', description: 'Name of the location' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'Main grazing area for dairy cattle', description: 'Description of the location', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ example: '123 Farm Road, Middlefield, OH', description: 'Address of the location', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  address?: string;

  @ApiProperty({ example: '41.4608', description: 'Latitude coordinates', required: false })
  @IsString()
  @IsOptional()
  latitude?: string;

  @ApiProperty({ example: '-81.0731', description: 'Longitude coordinates', required: false })
  @IsString()
  @IsOptional()
  longitude?: string;

  @ApiProperty({ example: true, description: 'Whether the location is active', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: 50, description: 'Maximum capacity of animals', required: false })
  @IsNumber()
  @IsOptional()
  capacity?: number;

  @ApiProperty({ example: 'Fencing needs repair on east side', description: 'Additional notes', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  notes?: string;
  
  @ApiProperty({ example: '8f9e7a6b-5d4c-3e2b-1a0f-9c8b7d6e5f4a', description: 'ID of the manager responsible for this location', required: false })
  @IsUUID()
  @IsOptional()
  managerId?: string;
} 