import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calf } from './entities/calf.entity';
import { CalvesService } from './calves.service';
import { CalvesController } from './calves.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Calf])],
  providers: [CalvesService],
  controllers: [CalvesController],
  exports: [CalvesService],
})
export class CalvesModule {} 