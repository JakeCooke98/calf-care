import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemSettings } from '../entities/system-settings.entity';
import { CreateSystemSettingsDto } from '../dto/create-system-settings.dto';
import { UpdateSystemSettingsDto } from '../dto/update-system-settings.dto';

@Injectable()
export class SystemSettingsService {
  constructor(
    @InjectRepository(SystemSettings)
    private systemSettingsRepository: Repository<SystemSettings>,
  ) {}

  async findOne(userId: string): Promise<SystemSettings> {
    const settings = await this.systemSettingsRepository.findOne({
      where: { ownerId: userId },
    });

    if (!settings) {
      // Create default settings if none exist
      return this.createDefaultSettings(userId);
    }

    return settings;
  }

  async createDefaultSettings(userId: string): Promise<SystemSettings> {
    const defaultSettings = this.systemSettingsRepository.create({
      autoBackup: true,
      dataSyncEnabled: true,
      emailNotifications: true,
      dataRetentionDays: 90,
      darkModeEnabled: false,
      defaultLanguage: 'en',
      notificationSettings: {
        email: true,
        sms: false,
        push: true,
      },
      ownerId: userId,
    });

    return this.systemSettingsRepository.save(defaultSettings);
  }

  async update(userId: string, updateSystemSettingsDto: UpdateSystemSettingsDto): Promise<SystemSettings> {
    const settings = await this.findOne(userId);

    // If notificationSettings is provided, merge with existing settings rather than replacing
    if (updateSystemSettingsDto.notificationSettings) {
      updateSystemSettingsDto.notificationSettings = {
        ...settings.notificationSettings,
        ...updateSystemSettingsDto.notificationSettings,
      };
    }

    // Update only the provided fields
    Object.assign(settings, updateSystemSettingsDto);

    return this.systemSettingsRepository.save(settings);
  }

  async create(userId: string, createSystemSettingsDto: CreateSystemSettingsDto): Promise<SystemSettings> {
    // First check if settings already exist for this user
    const existingSettings = await this.systemSettingsRepository.findOne({
      where: { ownerId: userId },
    });

    if (existingSettings) {
      // Update existing settings instead of creating new ones
      return this.update(userId, createSystemSettingsDto);
    }

    const settings = this.systemSettingsRepository.create({
      ...createSystemSettingsDto,
      ownerId: userId,
    });

    return this.systemSettingsRepository.save(settings);
  }

  async remove(userId: string): Promise<void> {
    const settings = await this.findOne(userId);
    await this.systemSettingsRepository.remove(settings);
  }
} 