import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from '../entities/breed.entity';
import { CreateBreedDto } from '../dto/create-breed.dto';
import { UpdateBreedDto } from '../dto/update-breed.dto';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>,
  ) {}

  async findAll(includeInactive = false): Promise<Breed[]> {
    if (includeInactive) {
      return this.breedRepository.find({
        order: { name: 'ASC' },
      });
    }
    
    return this.breedRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Breed> {
    const breed = await this.breedRepository.findOne({
      where: { id },
    });

    if (!breed) {
      throw new NotFoundException(`Breed with ID "${id}" not found`);
    }

    return breed;
  }

  async create(createBreedDto: CreateBreedDto): Promise<Breed> {
    // Check for existing breed with the same name
    const existingBreed = await this.breedRepository.findOne({
      where: { name: createBreedDto.name },
    });

    if (existingBreed) {
      throw new ConflictException(`Breed with name "${createBreedDto.name}" already exists`);
    }

    const breed = this.breedRepository.create(createBreedDto);
    return this.breedRepository.save(breed);
  }

  async update(id: string, updateBreedDto: UpdateBreedDto): Promise<Breed> {
    // First check if the breed exists
    const breed = await this.findOne(id);

    // If name is being updated, check it doesn't conflict with existing breeds
    if (updateBreedDto.name && updateBreedDto.name !== breed.name) {
      const existingBreed = await this.breedRepository.findOne({
        where: { name: updateBreedDto.name },
      });

      if (existingBreed && existingBreed.id !== id) {
        throw new ConflictException(`Breed with name "${updateBreedDto.name}" already exists`);
      }
    }

    // Update only the provided fields
    Object.assign(breed, updateBreedDto);

    return this.breedRepository.save(breed);
  }

  async remove(id: string): Promise<void> {
    const breed = await this.findOne(id);
    await this.breedRepository.remove(breed);
  }

  async deactivate(id: string): Promise<Breed> {
    const breed = await this.findOne(id);
    breed.isActive = false;
    return this.breedRepository.save(breed);
  }

  async seedDefaultBreeds(): Promise<void> {
    const defaultBreeds = [
      { name: 'Angus', description: 'Black beef cattle breed', avgWeight: '600-700' },
      { name: 'Holstein', description: 'Black and white dairy cattle', avgWeight: '580-680' },
      { name: 'Jersey', description: 'Small dairy breed with high butterfat', avgWeight: '400-500' },
      { name: 'Hereford', description: 'Red beef cattle with white face', avgWeight: '630-730' },
      { name: 'Simmental', description: 'Large dual-purpose cattle breed', avgWeight: '700-800' },
    ];

    for (const breedData of defaultBreeds) {
      const existingBreed = await this.breedRepository.findOne({
        where: { name: breedData.name },
      });

      if (!existingBreed) {
        await this.create(breedData as CreateBreedDto);
      }
    }
  }
} 