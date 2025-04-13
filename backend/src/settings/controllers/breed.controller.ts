import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/guards/roles.guard';
import { UserRole } from '../../users/entities/user.entity';
import { BreedService } from '../services/breed.service';
import { CreateBreedDto } from '../dto/create-breed.dto';
import { UpdateBreedDto } from '../dto/update-breed.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('breeds')
@ApiBearerAuth()
@Controller('settings/breeds')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Get()
  @ApiOperation({ summary: 'Get all breeds' })
  @ApiQuery({ name: 'includeInactive', required: false, type: Boolean, description: 'Include inactive breeds' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Breeds retrieved successfully' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findAll(@Query('includeInactive') includeInactive?: boolean) {
    return this.breedService.findAll(includeInactive === true);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a breed by ID' })
  @ApiParam({ name: 'id', description: 'The breed ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Breed retrieved successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Breed not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findOne(@Param('id') id: string) {
    return this.breedService.findOne(id);
  }

  @Post()
  @Roles(UserRole.FARM_MANAGER)
  @ApiOperation({ summary: 'Create a new breed (Farm Manager only)' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Breed created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Breed with this name already exists' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - requires Farm Manager role' })
  async create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedService.create(createBreedDto);
  }

  @Put(':id')
  @Roles(UserRole.FARM_MANAGER)
  @ApiOperation({ summary: 'Update a breed (Farm Manager only)' })
  @ApiParam({ name: 'id', description: 'The breed ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Breed updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Breed not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Breed with this name already exists' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - requires Farm Manager role' })
  async update(@Param('id') id: string, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedService.update(id, updateBreedDto);
  }

  @Delete(':id')
  @Roles(UserRole.FARM_MANAGER)
  @ApiOperation({ summary: 'Delete a breed (Farm Manager only)' })
  @ApiParam({ name: 'id', description: 'The breed ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Breed deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Breed not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - requires Farm Manager role' })
  async remove(@Param('id') id: string) {
    await this.breedService.remove(id);
    return { message: 'Breed deleted successfully' };
  }

  @Put(':id/deactivate')
  @Roles(UserRole.FARM_MANAGER)
  @ApiOperation({ summary: 'Deactivate a breed (Farm Manager only)' })
  @ApiParam({ name: 'id', description: 'The breed ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Breed deactivated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Breed not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden - requires Farm Manager role' })
  async deactivate(@Param('id') id: string) {
    return this.breedService.deactivate(id);
  }
} 