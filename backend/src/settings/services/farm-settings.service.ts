import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FarmSettings } from '../entities/farm-settings.entity';
import { CreateFarmSettingsDto } from '../dto/create-farm-settings.dto';
import { UpdateFarmSettingsDto } from '../dto/update-farm-settings.dto';

@Injectable()
export class FarmSettingsService {
  constructor(
    @InjectRepository(FarmSettings)
    private farmSettingsRepository: Repository<FarmSettings>,
  ) {}

  async findOne(userId: string): Promise<FarmSettings> {
    const settings = await this.farmSettingsRepository.findOne({
      where: { ownerId: userId },
    });

    if (!settings) {
      // Create default settings if none exist
      return this.createDefaultSettings(userId);
    }

    return settings;
  }

  async createDefaultSettings(userId: string): Promise<FarmSettings> {
    const defaultSettings = this.farmSettingsRepository.create({
      farmName: 'My Farm',
      timeZone: 'America/New_York',
      currency: 'USD',
      ownerId: userId,
    });

    return this.farmSettingsRepository.save(defaultSettings);
  }

  async update(userId: string, updateFarmSettingsDto: UpdateFarmSettingsDto): Promise<FarmSettings> {
    const settings = await this.findOne(userId);

    // Update only the provided fields
    Object.assign(settings, updateFarmSettingsDto);

    return this.farmSettingsRepository.save(settings);
  }

  async create(userId: string, createFarmSettingsDto: CreateFarmSettingsDto): Promise<FarmSettings> {
    // First check if settings already exist for this user
    const existingSettings = await this.farmSettingsRepository.findOne({
      where: { ownerId: userId },
    });

    if (existingSettings) {
      // Update existing settings instead of creating new ones
      return this.update(userId, createFarmSettingsDto);
    }

    const settings = this.farmSettingsRepository.create({
      ...createFarmSettingsDto,
      ownerId: userId,
    });

    return this.farmSettingsRepository.save(settings);
  }

  async remove(userId: string): Promise<void> {
    const settings = await this.findOne(userId);
    await this.farmSettingsRepository.remove(settings);
  }
} 