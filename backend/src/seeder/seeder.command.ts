import { Command, CommandRunner, Option } from 'nest-commander';
import { SeederService } from './seeder.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@Command({ name: 'seed-calves', description: 'Seed the database with calf data' })
export class SeederCommand extends CommandRunner {
  constructor(private readonly seederService: SeederService) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    const count = options?.count ? parseInt(options.count, 10) : 1000;
    const clear = options?.clear === 'true';
    
    try {
      if (clear) {
        await this.seederService.clear();
      }
      
      await this.seederService.seed(count);
      console.log(`Successfully seeded ${count} calves.`);
    } catch (error) {
      console.error('Error during seeding:', error);
    }
  }

  @Option({
    flags: '-c, --count [number]',
    description: 'Number of calves to seed (default: 1000)',
  })
  parseCount(val: string): string {
    return val;
  }

  @Option({
    flags: '--clear [boolean]',
    description: 'Clear existing data before seeding (default: false)',
  })
  parseClear(val: string): string {
    return val;
  }
} 