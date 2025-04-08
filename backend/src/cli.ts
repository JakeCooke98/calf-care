import { CommandFactory } from 'nest-commander';
import { SeederModule } from './seeder/seeder.module';

async function bootstrap() {
  try {
    await CommandFactory.run(SeederModule, {
      logger: ['error', 'warn', 'log'],
    });
  } catch (error) {
    console.error('Error running commands:', error);
    process.exit(1);
  }
}

bootstrap(); 