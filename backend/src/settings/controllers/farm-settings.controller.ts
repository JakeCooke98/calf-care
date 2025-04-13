import { Controller, Get, Put, Body, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/guards/roles.guard';
import { UserRole } from '../../users/entities/user.entity';
import { FarmSettingsService } from '../services/farm-settings.service';
import { UpdateFarmSettingsDto } from '../dto/update-farm-settings.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthUser } from '../../types';

@ApiTags('farm-settings')
@ApiBearerAuth()
@Controller('settings/farm')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FarmSettingsController {
  constructor(private readonly farmSettingsService: FarmSettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get farm settings for the current user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Farm settings retrieved successfully' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getFarmSettings(@Req() req: Request & { user: AuthUser }) {
    // The user ID is attached to the request by the JwtAuthGuard
    const userId = req.user.id;
    return this.farmSettingsService.findOne(userId);
  }

  @Put()
  @Roles(UserRole.FARM_MANAGER)
  @ApiOperation({ summary: 'Update farm settings (Farm Manager only)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Farm settings updated successfully' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - requires Farm Manager role' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async updateFarmSettings(
    @Req() req: Request & { user: AuthUser },
    @Body() updateFarmSettingsDto: UpdateFarmSettingsDto,
  ) {
    const userId = req.user.id;
    return this.farmSettingsService.update(userId, updateFarmSettingsDto);
  }
} 