import { PartialType } from '@nestjs/swagger';
import { CreateFarmLocationDto } from './create-farm-location.dto';

export class UpdateFarmLocationDto extends PartialType(CreateFarmLocationDto) {} 