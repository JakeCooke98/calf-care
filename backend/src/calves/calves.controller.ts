import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ApiQuery, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CalvesService } from './calves.service';
import { CreateCalfDto, UpdateCalfDto } from './dto/calf.dto';
import { Calf } from './entities/calf.entity';

@ApiTags('calves')
@Controller('calves')
export class CalvesController {
  constructor(private readonly calvesService: CalvesService) {}

  @Post()
  async create(@Body() createCalfDto: CreateCalfDto): Promise<Calf> {
    return this.calvesService.create(createCalfDto);
  }

  @Get()
  async findAll(): Promise<Calf[]> {
    return this.calvesService.findAll();
  }

  @Get('stats')
  async getStatistics() {
    return this.calvesService.getStatistics();
  }

  @Get('watchlist')
  async findInWatchlist(): Promise<Calf[]> {
    return this.calvesService.findByWatchlist(true);
  }

  @Get('recent')
  async getRecentCalves() {
    return this.calvesService.getRecentCalves();
  }

  @Get('health-distribution')
  async getHealthDistribution() {
    return this.calvesService.getHealthDistribution();
  }

  @Get('breed-distribution')
  async getBreedDistribution() {
    return this.calvesService.getBreedDistribution();
  }

  @Get('gender-distribution')
  async getGenderDistribution() {
    return this.calvesService.getGenderDistribution();
  }

  @Get('location-distribution')
  async getLocationDistribution() {
    return this.calvesService.getLocationDistribution();
  }

  @Get('age-distribution')
  async getAgeDistribution() {
    return this.calvesService.getAgeDistribution();
  }

  @Get('daily-birth-rate')
  @ApiQuery({ name: 'days', required: false, type: Number, description: 'Number of days to include', example: 7 })
  async getDailyBirthRate(@Query('days') days?: string) {
    const parsedDays = days ? parseInt(days, 10) : 7;
    return this.calvesService.getDailyBirthRate(parsedDays);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search and filter calves with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (starts at 1)', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  @ApiQuery({ name: 'health', required: false, type: String, description: 'Filter by health status', example: 'Good' })
  @ApiQuery({ name: 'minAge', required: false, type: Number, description: 'Minimum age in days', example: 30 })
  @ApiQuery({ name: 'maxAge', required: false, type: Number, description: 'Maximum age in days', example: 90 })
  @ApiQuery({ name: 'breed', required: false, type: String, description: 'Filter by breed', example: 'Holstein' })
  @ApiQuery({ name: 'location', required: false, type: String, description: 'Filter by location', example: 'North Pasture' })
  @ApiQuery({ name: 'isAlive', required: false, type: Boolean, description: 'Filter by alive status', example: true })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search text across multiple fields', example: 'dairy' })
  async searchCalves(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('health') health?: string,
    @Query('minAge') minAge?: string,
    @Query('maxAge') maxAge?: string,
    @Query('breed') breed?: string,
    @Query('location') location?: string,
    @Query('isAlive') isAlive?: string,
    @Query('search') search?: string,
  ) {
    // Parse numeric and boolean values with safe defaults
    const parsedPage = page ? parseInt(page, 10) : 1;
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    const parsedMinAge = minAge ? parseInt(minAge, 10) : undefined;
    const parsedMaxAge = maxAge ? parseInt(maxAge, 10) : undefined;
    const parsedIsAlive = isAlive ? (isAlive === 'true') : undefined;

    return this.calvesService.searchCalves({
      page: parsedPage,
      limit: parsedLimit,
      health,
      minAge: parsedMinAge,
      maxAge: parsedMaxAge,
      breed,
      location,
      isAlive: parsedIsAlive,
      search,
    });
  }

  @Get('alive/:status')
  async findByAliveStatus(@Param('status') status: string): Promise<Calf[]> {
    const isAlive = status === 'true';
    return this.calvesService.findByAliveStatus(isAlive);
  }
  
  @Get('location/:location')
  async findByLocation(@Param('location') location: string): Promise<Calf[]> {
    return this.calvesService.findByLocation(location);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Calf> {
    return this.calvesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCalfDto: UpdateCalfDto,
  ): Promise<Calf> {
    return this.calvesService.update(id, updateCalfDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.calvesService.remove(id);
  }
} 