import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CalvesService } from './calves.service';
import { CreateCalfDto, UpdateCalfDto } from './dto/calf.dto';
import { Calf } from './entities/calf.entity';

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

  @Get('watchlist')
  async findInWatchlist(): Promise<Calf[]> {
    return this.calvesService.findByWatchlist(true);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Calf> {
    return this.calvesService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCalfDto: UpdateCalfDto,
  ): Promise<Calf> {
    return this.calvesService.update(+id, updateCalfDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.calvesService.remove(+id);
  }
} 