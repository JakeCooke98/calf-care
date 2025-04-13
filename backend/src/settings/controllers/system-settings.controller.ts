import { Controller, Get, Put, Body, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/guards/roles.guard';
import { UserRole } from '../../users/entities/user.entity';
import { SystemSettingsService } from '../services/system-settings.service';
import { UpdateSystemSettingsDto } from '../dto/update-system-settings.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthUser } from '../../types';

@ApiTags('system-settings')
@ApiBearerAuth()
@Controller('settings/system')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SystemSettingsController {
  constructor(private readonly systemSettingsService: SystemSettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get system settings for the current user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'System settings retrieved successfully' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getSystemSettings(@Req() req: Request & { user: AuthUser }) {
    const userId = req.user.id;
    return this.systemSettingsService.findOne(userId);
  }

  @Put()
  @Roles(UserRole.FARM_MANAGER)
  @ApiOperation({ summary: 'Update system settings (Farm Manager only)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'System settings updated successfully' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - requires Farm Manager role' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async updateSystemSettings(
    @Req() req: Request & { user: AuthUser },
    @Body() updateSystemSettingsDto: UpdateSystemSettingsDto,
  ) {
    const userId = req.user.id;
    return this.systemSettingsService.update(userId, updateSystemSettingsDto);
  }
} 