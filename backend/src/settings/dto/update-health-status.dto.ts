import { PartialType } from '@nestjs/swagger';
import { CreateHealthStatusDto } from './create-health-status.dto';

export class UpdateHealthStatusDto extends PartialType(CreateHealthStatusDto) {} 