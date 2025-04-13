import { IsString, IsEmail, IsOptional, IsEnum, IsBoolean, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The user\'s full name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'The user\'s email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'The user\'s password' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ 
    example: UserRole.STAFF, 
    description: 'The user\'s role',
    enum: UserRole,
    default: UserRole.STAFF
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ example: true, description: 'Whether the user is active' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The user\'s full name', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'john@example.com', description: 'The user\'s email address', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'password123', description: 'The user\'s password', required: false })
  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;

  @ApiProperty({ 
    example: UserRole.STAFF, 
    description: 'The user\'s role',
    enum: UserRole,
    required: false
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ example: true, description: 'Whether the user is active', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}