import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { SeederCommand } from './seeder.command';
import { Calf } from '../calves/entities/calf.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SettingsModule } from '../settings/settings.module';
import { SettingsSeeder } from './settings.seeder';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // Set to false in production
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Calf]),
    SettingsModule,
  ],
  providers: [SeederService, SeederCommand, SettingsSeeder],
})
export class SeederModule {} 