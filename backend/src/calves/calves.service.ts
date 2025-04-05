import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calf } from './entities/calf.entity';
import { CreateCalfDto, UpdateCalfDto } from './dto/calf.dto';

@Injectable()
export class CalvesService {
  constructor(
    @InjectRepository(Calf)
    private calvesRepository: Repository<Calf>,
  ) {}

  async create(createCalfDto: CreateCalfDto): Promise<Calf> {
    const calf = this.calvesRepository.create(createCalfDto);
    return this.calvesRepository.save(calf);
  }

  async findAll(): Promise<Calf[]> {
    return this.calvesRepository.find();
  }

  async findOne(id: string): Promise<Calf> {
    const calf = await this.calvesRepository.findOne({ where: { id } });
    if (!calf) {
      throw new NotFoundException(`Calf with ID ${id} not found`);
    }
    return calf;
  }

  async update(id: string, updateCalfDto: UpdateCalfDto): Promise<Calf> {
    const calf = await this.findOne(id);
    this.calvesRepository.merge(calf, updateCalfDto);
    return this.calvesRepository.save(calf);
  }

  async remove(id: string): Promise<void> {
    const calf = await this.findOne(id);
    await this.calvesRepository.remove(calf);
  }

  async findByWatchlist(inWatchlist: boolean): Promise<Calf[]> {
    return this.calvesRepository.find({ where: { inWatchlist } });
  }

  async findByAliveStatus(isAlive: boolean): Promise<Calf[]> {
    return this.calvesRepository.find({ where: { isAlive } });
  }
  
  async findByLocation(location: string): Promise<Calf[]> {
    return this.calvesRepository.find({ where: { location } });
  }
} 