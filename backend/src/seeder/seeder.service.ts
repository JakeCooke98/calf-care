import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calf } from '../calves/entities/calf.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Calf)
    private readonly calvesRepository: Repository<Calf>,
  ) {}

  /**
   * Generate a random calf record with realistic data
   */
  generateCalf(): Partial<Calf> {
    // Common dairy cattle breeds
    const breeds = [
      'Holstein', 'Jersey', 'Guernsey', 'Ayrshire', 'Brown Swiss',
      'Friesian', 'Shorthorn', 'Angus', 'Hereford', 'Simmental'
    ];
    
    // Farm locations
    const locations = [
      'North Pasture', 'South Pasture', 'Main Barn', 'Calving Barn', 
      'Heifer Pen', 'West Field', 'East Field', 'Isolation Pen',
      'Feeding Area', 'Milking Parlour Annex'
    ];
    
    // Health statuses
    const healthStatuses = [
      'Excellent', 'Good', 'Fair', 'Poor', 'Critical'
    ];
    
    // Weight distribution based on weighted probabilities
    const healthDistribution = {
      'Excellent': 0.4,  // 40% chance
      'Good': 0.35,      // 35% chance
      'Fair': 0.15,      // 15% chance
      'Poor': 0.08,      // 8% chance
      'Critical': 0.02   // 2% chance
    };
    
    // Generate a random age (0-730 days, weighted toward younger)
    // 730 days = 2 years, which is when they typically transition from calves to heifers
    const age = Math.floor(Math.pow(Math.random(), 1.5) * 730);
    
    // Generate a random breed
    const breed = breeds[Math.floor(Math.random() * breeds.length)];
    
    // Gender - 70% female in dairy operations
    const gender = Math.random() < 0.7 ? 'Female' : 'Male';
    
    // Generate weight - correlated with age (in days) and has some randomness
    // Base weight range: 35kg (newborn) to 350kg (2-year-old)
    // Using age in days instead of months for more granular weight calculation
    const baseWeight = 35 + (age * 0.43); // ~0.43kg gain per day on average
    // Add variation: +/- 15% from the base weight
    const weightVariation = baseWeight * (0.85 + (Math.random() * 0.3));
    // Adjust for breed - some breeds are heavier than others
    const breedFactor = breed === 'Holstein' || breed === 'Brown Swiss' ? 1.1 : 
                        breed === 'Jersey' || breed === 'Guernsey' ? 0.9 : 1.0;
    
    const weight = Math.round(weightVariation * breedFactor * 10) / 10; // Round to 1 decimal place
    
    // Generate health status based on weighted distribution
    const healthRoll = Math.random();
    let cumulativeProbability = 0;
    let health = 'Good'; // Default
    
    for (const [status, probability] of Object.entries(healthDistribution)) {
      cumulativeProbability += probability;
      if (healthRoll < cumulativeProbability) {
        health = status;
        break;
      }
    }
    
    // Around 1% mortality rate
    const isAlive = Math.random() > 0.01;
    
    // About 5% of calves need extra attention (watchlist)
    // Critical condition animals are more likely to be on watchlist
    const watchlistProbability = health === 'Critical' ? 0.8 : 
                                health === 'Poor' ? 0.4 : 0.05;
    const inWatchlist = Math.random() < watchlistProbability;
    
    // Choose a random location
    const location = locations[Math.floor(Math.random() * locations.length)];
    
    // Generate a name for the calf
    const calfNames = [
      'Daisy', 'Bella', 'Buttercup', 'Clover', 'Rose', 'Lily', 'Poppy', 
      'Mabel', 'Bessie', 'Molly', 'Maggie', 'Lulu', 'Rosie', 'Stella', 
      'Penny', 'Moo', 'Twilight', 'Spot', 'Peanut', 'Cookie', 'Oreo',
      'Brownie', 'Cocoa', 'Star', 'Luna', 'Sky', 'Shadow', 'Midnight',
      'Sunny', 'Stormy', 'Rocky', 'Sandy', 'Dusty', 'Snowy', 'Winter',
      'Spring', 'Summer', 'Autumn', 'Blizzard', 'Thunder', 'Lightning'
    ];
    
    // For more diverse names, we'll sometimes use a generated name
    const name = Math.random() < 0.7 ? 
                 calfNames[Math.floor(Math.random() * calfNames.length)] : 
                 faker.word.noun({ length: { min: 3, max: 8 } }).charAt(0).toUpperCase() + 
                 faker.word.noun({ length: { min: 3, max: 8 } }).slice(1);
    
    // Create timestamp between 0-2 years ago, weighted toward more recent
    const randomDate = new Date();
    const randomDays = Math.floor(Math.pow(Math.random(), 1.2) * 730); // 730 days = 2 years
    randomDate.setDate(randomDate.getDate() - randomDays);
    
    // Generate the calf record
    return {
      name,
      age,
      weight,
      health,
      breed,
      gender,
      location,
      isAlive,
      inWatchlist,
      createdAt: randomDate,
      updatedAt: randomDate,
    };
  }

  /**
   * Seed the database with a specified number of calf records
   */
  async seed(count: number): Promise<void> {
    console.log(`Starting to seed ${count} calves...`);
    
    // Generate calves in batches to avoid memory issues
    const batchSize = 100;
    const batches = Math.ceil(count / batchSize);
    
    for (let i = 0; i < batches; i++) {
      const remainingCount = Math.min(batchSize, count - (i * batchSize));
      const calvesData = Array(remainingCount)
        .fill(null)
        .map(() => this.generateCalf());
      
      await this.calvesRepository.save(calvesData);
      console.log(`Seeded batch ${i + 1}/${batches} (${(i + 1) * batchSize <= count ? (i + 1) * batchSize : count}/${count} calves)`);
    }
    
    console.log('Seeding completed successfully!');
  }

  /**
   * Clear all existing calf data
   */
  async clear(): Promise<void> {
    await this.calvesRepository.clear();
    console.log('All existing calf data has been cleared');
  }
} 