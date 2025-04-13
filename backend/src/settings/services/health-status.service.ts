import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthStatus } from '../entities/health-status.entity';
import { CreateHealthStatusDto } from '../dto/create-health-status.dto';
import { UpdateHealthStatusDto } from '../dto/update-health-status.dto';

@Injectable()
export class HealthStatusService {
  constructor(
    @InjectRepository(HealthStatus)
    private healthStatusRepository: Repository<HealthStatus>,
  ) {}

  async findAll(includeInactive = false): Promise<HealthStatus[]> {
    if (includeInactive) {
      return this.healthStatusRepository.find({
        order: { displayOrder: 'ASC', name: 'ASC' },
      });
    }
    
    return this.healthStatusRepository.find({
      where: { isActive: true },
      order: { displayOrder: 'ASC', name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<HealthStatus> {
    const status = await this.healthStatusRepository.findOne({
      where: { id },
    });

    if (!status) {
      throw new NotFoundException(`Health status with ID "${id}" not found`);
    }

    return status;
  }

  async create(createHealthStatusDto: CreateHealthStatusDto): Promise<HealthStatus> {
    // Check for existing status with the same name
    const existingStatus = await this.healthStatusRepository.findOne({
      where: { name: createHealthStatusDto.name },
    });

    if (existingStatus) {
      throw new ConflictException(`Health status with name "${createHealthStatusDto.name}" already exists`);
    }

    // If no display order provided, set it to the last position
    if (!createHealthStatusDto.displayOrder) {
      const lastStatus = await this.healthStatusRepository.findOne({
        order: { displayOrder: 'DESC' },
      });

      if (lastStatus && lastStatus.displayOrder) {
        createHealthStatusDto.displayOrder = lastStatus.displayOrder + 1;
      } else {
        createHealthStatusDto.displayOrder = 1;
      }
    }

    const status = this.healthStatusRepository.create(createHealthStatusDto);
    return this.healthStatusRepository.save(status);
  }

  async update(id: string, updateHealthStatusDto: UpdateHealthStatusDto): Promise<HealthStatus> {
    // First check if the status exists
    const status = await this.findOne(id);

    // If name is being updated, check it doesn't conflict with existing statuses
    if (updateHealthStatusDto.name && updateHealthStatusDto.name !== status.name) {
      const existingStatus = await this.healthStatusRepository.findOne({
        where: { name: updateHealthStatusDto.name },
      });

      if (existingStatus && existingStatus.id !== id) {
        throw new ConflictException(`Health status with name "${updateHealthStatusDto.name}" already exists`);
      }
    }

    // Update only the provided fields
    Object.assign(status, updateHealthStatusDto);

    return this.healthStatusRepository.save(status);
  }

  async remove(id: string): Promise<void> {
    const status = await this.findOne(id);
    await this.healthStatusRepository.remove(status);
  }

  async deactivate(id: string): Promise<HealthStatus> {
    const status = await this.findOne(id);
    status.isActive = false;
    return this.healthStatusRepository.save(status);
  }

  async seedDefaultHealthStatuses(): Promise<void> {
    const defaultStatuses = [
      { name: 'Healthy', description: 'Animal is in good health', color: 'green', requiresAttention: false, isEmergency: false, displayOrder: 1 },
      { name: 'Observation', description: 'Animal needs to be monitored', color: 'yellow', requiresAttention: true, isEmergency: false, displayOrder: 2 },
      { name: 'Treatment', description: 'Animal is under treatment', color: 'orange', requiresAttention: true, isEmergency: false, displayOrder: 3 },
      { name: 'Critical', description: 'Animal requires immediate attention', color: 'red', requiresAttention: true, isEmergency: true, displayOrder: 4 },
      { name: 'Recovering', description: 'Animal is recovering from illness', color: 'blue', requiresAttention: true, isEmergency: false, displayOrder: 5 },
    ];

    for (const statusData of defaultStatuses) {
      const existingStatus = await this.healthStatusRepository.findOne({
        where: { name: statusData.name },
      });

      if (!existingStatus) {
        await this.create(statusData as CreateHealthStatusDto);
      }
    }
  }
} 