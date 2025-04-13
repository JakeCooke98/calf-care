import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmSettings } from './entities/farm-settings.entity';
import { SystemSettings } from './entities/system-settings.entity';
import { Breed } from './entities/breed.entity';
import { FarmLocation } from './entities/farm-location.entity';
import { HealthStatus } from './entities/health-status.entity';
import { FarmSettingsService } from './services/farm-settings.service';
import { SystemSettingsService } from './services/system-settings.service';
import { BreedService } from './services/breed.service';
import { FarmLocationService } from './services/farm-location.service';
import { HealthStatusService } from './services/health-status.service';
import { FarmSettingsController } from './controllers/farm-settings.controller';
import { SystemSettingsController } from './controllers/system-settings.controller';
import { BreedController } from './controllers/breed.controller';
import { FarmLocationController } from './controllers/farm-location.controller';
import { HealthStatusController } from './controllers/health-status.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FarmSettings,
      SystemSettings,
      Breed,
      FarmLocation,
      HealthStatus,
    ]),
  ],
  controllers: [
    FarmSettingsController,
    SystemSettingsController,
    BreedController,
    FarmLocationController,
    HealthStatusController,
  ],
  providers: [
    FarmSettingsService,
    SystemSettingsService,
    BreedService,
    FarmLocationService,
    HealthStatusService,
  ],
  exports: [
    FarmSettingsService,
    SystemSettingsService,
    BreedService,
    FarmLocationService,
    HealthStatusService,
  ],
})
export class SettingsModule {}
