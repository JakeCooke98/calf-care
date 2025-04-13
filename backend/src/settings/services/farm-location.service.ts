import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FarmLocation } from '../entities/farm-location.entity';
import { CreateFarmLocationDto } from '../dto/create-farm-location.dto';
import { UpdateFarmLocationDto } from '../dto/update-farm-location.dto';

@Injectable()
export class FarmLocationService {
  constructor(
    @InjectRepository(FarmLocation)
    private farmLocationRepository: Repository<FarmLocation>,
  ) {}

  async findAll(includeInactive = false): Promise<FarmLocation[]> {
    if (includeInactive) {
      return this.farmLocationRepository.find({
        order: { name: 'ASC' },
        relations: ['manager'],
      });
    }
    
    return this.farmLocationRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<FarmLocation> {
    const location = await this.farmLocationRepository.findOne({
      where: { id },
    });

    if (!location) {
      throw new NotFoundException(`Farm location with ID "${id}" not found`);
    }

    return location;
  }

  async create(createFarmLocationDto: CreateFarmLocationDto): Promise<FarmLocation> {
    // Check for existing location with the same name
    const existingLocation = await this.farmLocationRepository.findOne({
      where: { name: createFarmLocationDto.name },
    });

    if (existingLocation) {
      throw new ConflictException(`Farm location with name "${createFarmLocationDto.name}" already exists`);
    }

    const location = this.farmLocationRepository.create(createFarmLocationDto);
    return this.farmLocationRepository.save(location);
  }

  async update(id: string, updateFarmLocationDto: UpdateFarmLocationDto): Promise<FarmLocation> {
    // First check if the location exists
    const location = await this.findOne(id);

    // If name is being updated, check it doesn't conflict with existing locations
    if (updateFarmLocationDto.name && updateFarmLocationDto.name !== location.name) {
      const existingLocation = await this.farmLocationRepository.findOne({
        where: { name: updateFarmLocationDto.name },
      });

      if (existingLocation && existingLocation.id !== id) {
        throw new ConflictException(`Farm location with name "${updateFarmLocationDto.name}" already exists`);
      }
    }

    // Update only the provided fields
    Object.assign(location, updateFarmLocationDto);

    return this.farmLocationRepository.save(location);
  }

  async remove(id: string): Promise<void> {
    const location = await this.findOne(id);
    await this.farmLocationRepository.remove(location);
  }

  async deactivate(id: string): Promise<FarmLocation> {
    const location = await this.findOne(id);
    location.isActive = false;
    return this.farmLocationRepository.save(location);
  }

  async seedDefaultLocations(): Promise<void> {
    const defaultLocations = [
      { name: 'Main Barn', description: 'Primary housing facility', capacity: 100 },
      { name: 'North Pasture', description: 'Grazing area for older animals', capacity: 50 },
      { name: 'South Pasture', description: 'Grazing area for younger animals', capacity: 30 },
      { name: 'Milking Parlor', description: 'Milking facility', capacity: 20 },
    ];

    for (const locationData of defaultLocations) {
      const existingLocation = await this.farmLocationRepository.findOne({
        where: { name: locationData.name },
      });

      if (!existingLocation) {
        await this.create(locationData as CreateFarmLocationDto);
      }
    }
  }
} 