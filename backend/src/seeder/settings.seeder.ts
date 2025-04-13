import { Injectable } from '@nestjs/common';
import { BreedService } from '../settings/services/breed.service';
import { HealthStatusService } from '../settings/services/health-status.service';
import { FarmLocationService } from '../settings/services/farm-location.service';

@Injectable()
export class SettingsSeeder {
  constructor(
    private readonly breedService: BreedService,
    private readonly healthStatusService: HealthStatusService,
    private readonly farmLocationService: FarmLocationService,
  ) {}

  async seed(): Promise<void> {
    console.log('🌱 Seeding settings data...');
    
    await this.seedBreeds();
    await this.seedHealthStatuses();
    await this.seedFarmLocations();
    
    console.log('✅ Settings seeding completed!');
  }

  private async seedBreeds(): Promise<void> {
    console.log('🐄 Seeding breeds...');
    await this.breedService.seedDefaultBreeds();
  }

  private async seedHealthStatuses(): Promise<void> {
    console.log('🩺 Seeding health statuses...');
    await this.healthStatusService.seedDefaultHealthStatuses();
  }

  private async seedFarmLocations(): Promise<void> {
    console.log('🏡 Seeding farm locations...');
    await this.farmLocationService.seedDefaultLocations();
  }
} 