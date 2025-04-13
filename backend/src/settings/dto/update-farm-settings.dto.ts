import { PartialType } from '@nestjs/swagger';
import { CreateFarmSettingsDto } from './create-farm-settings.dto';

export class UpdateFarmSettingsDto extends PartialType(CreateFarmSettingsDto) {} 