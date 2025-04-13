import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/guards/roles.guard';
import { UserRole } from '../../users/entities/user.entity';
import { FarmLocationService } from '../services/farm-location.service';
import { CreateFarmLocationDto } from '../dto/create-farm-location.dto';
import { UpdateFarmLocationDto } from '../dto/update-farm-location.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('farm-locations')
@ApiBearerAuth()
@Controller('settings/locations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FarmLocationController {
  constructor(private readonly farmLocationService: FarmLocationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all farm locations' })
  @ApiQuery({ name: 'includeInactive', required: false, type: Boolean, description: 'Include inactive locations' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Farm locations retrieved successfully' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findAll(@Query('includeInactive') includeInactive?: boolean) {
    return this.farmLocationService.findAll(includeInactive === true);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a farm location by ID' })
  @ApiParam({ name: 'id', description: 'The farm location ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Farm location retrieved successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Farm location not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findOne(@Param('id') id: string) {
    return this.farmLocationService.findOne(id);
  }

  @Post()
  @Roles(UserRole.FARM_MANAGER)
  @ApiOperation({ summary: 'Create a new farm location (Farm Manager only)' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Farm location created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Farm location with this name already exists' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - requires Farm Manager role' })
  async create(@Body() createFarmLocationDto: CreateFarmLocationDto) {
    return this.farmLocationService.create(createFarmLocationDto);
  }

  @Put(':id')
  @Roles(UserRole.FARM_MANAGER, UserRole.VETERINARIAN)
  @ApiOperation({ summary: 'Update a farm location (Farm Manager or Veterinarian only)' })
  @ApiParam({ name: 'id', description: 'The farm location ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Farm location updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Farm location not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Farm location with this name already exists' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - requires Farm Manager or Veterinarian role' })
  async update(@Param('id') id: string, @Body() updateFarmLocationDto: UpdateFarmLocationDto) {
    return this.farmLocationService.update(id, updateFarmLocationDto);
  }

  @Delete(':id')
  @Roles(UserRole.FARM_MANAGER)
  @ApiOperation({ summary: 'Delete a farm location (Farm Manager only)' })
  @ApiParam({ name: 'id', description: 'The farm location ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Farm location deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Farm location not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - requires Farm Manager role' })
  async remove(@Param('id') id: string) {
    await this.farmLocationService.remove(id);
    return { message: 'Farm location deleted successfully' };
  }

  @Put(':id/deactivate')
  @Roles(UserRole.FARM_MANAGER)
  @ApiOperation({ summary: 'Deactivate a farm location (Farm Manager only)' })
  @ApiParam({ name: 'id', description: 'The farm location ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Farm location deactivated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Farm location not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - requires Farm Manager role' })
  async deactivate(@Param('id') id: string) {
    return this.farmLocationService.deactivate(id);
  }
} 