import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles, ROLES_KEY } from '../../auth/guards/roles.guard';
import { UserRole } from '../../users/entities/user.entity';
import { HealthStatusService } from '../services/health-status.service';
import { CreateHealthStatusDto } from '../dto/create-health-status.dto';
import { UpdateHealthStatusDto } from '../dto/update-health-status.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('health-statuses')
@ApiBearerAuth()
@Controller('settings/health-statuses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HealthStatusController {
  constructor(private readonly healthStatusService: HealthStatusService) {}

  @Get()
  @ApiOperation({ summary: 'Get all health statuses' })
  @ApiQuery({ name: 'includeInactive', required: false, type: Boolean, description: 'Include inactive statuses' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Health statuses retrieved successfully' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findAll(@Query('includeInactive') includeInactive?: boolean) {
    return this.healthStatusService.findAll(includeInactive === true);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a health status by ID' })
  @ApiParam({ name: 'id', description: 'The health status ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Health status retrieved successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Health status not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findOne(@Param('id') id: string) {
    return this.healthStatusService.findOne(id);
  }

  @Post()
  @Roles(UserRole.FARM_MANAGER)
  @ApiOperation({ summary: 'Create a new health status (Farm Manager only)' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Health status created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Health status with this name already exists' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - requires Farm Manager role' })
  async create(@Body() createHealthStatusDto: CreateHealthStatusDto) {
    return this.healthStatusService.create(createHealthStatusDto);
  }

  @Put(':id')
  @Roles(UserRole.FARM_MANAGER)
  @ApiOperation({ summary: 'Update a health status (Farm Manager only)' })
  @ApiParam({ name: 'id', description: 'The health status ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Health status updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Health status not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Health status with this name already exists' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - requires Farm Manager role' })
  async update(@Param('id') id: string, @Body() updateHealthStatusDto: UpdateHealthStatusDto) {
    return this.healthStatusService.update(id, updateHealthStatusDto);
  }

  @Delete(':id')
  @Roles(UserRole.FARM_MANAGER)
  @ApiOperation({ summary: 'Delete a health status (Farm Manager only)' })
  @ApiParam({ name: 'id', description: 'The health status ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Health status deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Health status not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - requires Farm Manager role' })
  async remove(@Param('id') id: string) {
    await this.healthStatusService.remove(id);
    return { message: 'Health status deleted successfully' };
  }

  @Put(':id/deactivate')
  @Roles(UserRole.FARM_MANAGER)
  @ApiOperation({ summary: 'Deactivate a health status (Farm Manager only)' })
  @ApiParam({ name: 'id', description: 'The health status ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Health status deactivated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Health status not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - requires Farm Manager role' })
  async deactivate(@Param('id') id: string) {
    return this.healthStatusService.deactivate(id);
  }
}
