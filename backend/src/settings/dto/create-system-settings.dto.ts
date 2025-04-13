import { IsBoolean, IsOptional, IsNumber, IsString, Min, Max, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemSettingsDto {
  @ApiProperty({ example: true, description: 'Enable automatic backups' })
  @IsBoolean()
  @IsOptional()
  autoBackup?: boolean;

  @ApiProperty({ example: true, description: 'Enable data synchronization' })
  @IsBoolean()
  @IsOptional()
  dataSyncEnabled?: boolean;

  @ApiProperty({ example: true, description: 'Enable email notifications' })
  @IsBoolean()
  @IsOptional()
  emailNotifications?: boolean;

  @ApiProperty({ example: 90, description: 'Data retention period in days' })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(3650)
  dataRetentionDays?: number;

  @ApiProperty({ example: false, description: 'Enable dark mode' })
  @IsBoolean()
  @IsOptional()
  darkModeEnabled?: boolean;

  @ApiProperty({ example: 'en', description: 'Default language' })
  @IsString()
  @IsOptional()
  defaultLanguage?: string;

  @ApiProperty({ 
    example: { 
      email: true,
      sms: false,
      push: true 
    }, 
    description: 'Notification settings' 
  })
  @IsObject()
  @IsOptional()
  notificationSettings?: Record<string, any>;
} 