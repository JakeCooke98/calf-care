import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calf } from './entities/calf.entity';
import { CreateCalfDto, UpdateCalfDto } from './dto/calf.dto';

interface SearchParams {
  page: number;
  limit: number;
  health?: string;
  minAge?: number;
  maxAge?: number;
  breed?: string;
  location?: string;
  isAlive?: boolean;
  search?: string;
}

@Injectable()
export class CalvesService {
  constructor(
    @InjectRepository(Calf)
    private calvesRepository: Repository<Calf>,
  ) {}

  async create(createCalfDto: CreateCalfDto): Promise<Calf> {
    const calf = this.calvesRepository.create(createCalfDto);
    return this.calvesRepository.save(calf);
  }

  async findAll(): Promise<Calf[]> {
    return this.calvesRepository.find();
  }

  async findOne(id: string): Promise<Calf> {
    const calf = await this.calvesRepository.findOne({ where: { id } });
    if (!calf) {
      throw new NotFoundException(`Calf with ID ${id} not found`);
    }
    return calf;
  }

  async update(id: string, updateCalfDto: UpdateCalfDto): Promise<Calf> {
    const calf = await this.findOne(id);
    this.calvesRepository.merge(calf, updateCalfDto);
    return this.calvesRepository.save(calf);
  }

  async remove(id: string): Promise<void> {
    const calf = await this.findOne(id);
    await this.calvesRepository.remove(calf);
  }

  async findByWatchlist(inWatchlist: boolean): Promise<Calf[]> {
    return this.calvesRepository.find({ where: { inWatchlist } });
  }

  async findByAliveStatus(isAlive: boolean): Promise<Calf[]> {
    return this.calvesRepository.find({ where: { isAlive } });
  }
  
  async findByLocation(location: string): Promise<Calf[]> {
    return this.calvesRepository.find({ where: { location } });
  }

  async getStatistics() {
    const totalCount = await this.calvesRepository.count();
    const watchlistCount = await this.calvesRepository.count({ where: { inWatchlist: true } });
    const aliveCount = await this.calvesRepository.count({ where: { isAlive: true } });
    const deceasedCount = totalCount - aliveCount;
    
    // Calculate average weight
    const result = await this.calvesRepository
      .createQueryBuilder('calf')
      .select('AVG(calf.weight)', 'averageWeight')
      .getRawOne();
    
    const averageWeight = result ? parseFloat(result.averageWeight) : 0;
    
    return {
      totalCount,
      watchlistCount,
      aliveCount,
      deceasedCount,
      averageWeight,
    };
  }

  async getRecentCalves() {
    
    return this.calvesRepository.createQueryBuilder('calf')
      .where('calf.age <= 7')
      .getMany();
  }

  async getHealthDistribution() {
    // Execute raw query to get health counts
    const healthCounts = await this.calvesRepository
      .createQueryBuilder('calf')
      .select('calf.health', 'health')
      .addSelect('COUNT(calf.id)', 'count')
      .groupBy('calf.health')
      .getRawMany();
    
    // Convert to the desired format
    return healthCounts.map(item => ({
      name: item.health,
      value: parseInt(item.count, 10),
    }));
  }

  async getBreedDistribution() {
    const breedCounts = await this.calvesRepository
      .createQueryBuilder('calf')
      .select('calf.breed', 'breed')
      .addSelect('COUNT(calf.id)', 'count')
      .groupBy('calf.breed')
      .getRawMany();
    
    return breedCounts.map(item => ({
      name: item.breed || 'Unknown',
      value: parseInt(item.count, 10),
    }));
  }

  async getGenderDistribution() {
    const genderCounts = await this.calvesRepository
      .createQueryBuilder('calf')
      .select('calf.gender', 'gender')
      .addSelect('COUNT(calf.id)', 'count')
      .groupBy('calf.gender')
      .getRawMany();
    
    return genderCounts.map(item => ({
      name: item.gender || 'Unknown',
      value: parseInt(item.count, 10),
    }));
  }

  async getLocationDistribution() {
    const locationCounts = await this.calvesRepository
      .createQueryBuilder('calf')
      .select('calf.location', 'location')
      .addSelect('COUNT(calf.id)', 'count')
      .groupBy('calf.location')
      .getRawMany();
    
    return locationCounts.map(item => ({
      name: item.location || 'Unknown',
      value: parseInt(item.count, 10),
    }));
  }

  async getAgeDistribution() {
    // Define age ranges
    const ageRanges = [
      { name: '0-30 days', min: 0, max: 30 },
      { name: '31-90 days', min: 31, max: 90 },
      { name: '91-180 days', min: 91, max: 180 },
      { name: '181-365 days', min: 181, max: 365 },
      { name: '366+ days', min: 366, max: Number.MAX_SAFE_INTEGER }
    ];
    
    // Get all calves with their ages
    const calves = await this.calvesRepository.find();
    
    // Count calves in each age range
    const distribution = ageRanges.map(range => {
      const count = calves.filter(
        calf => calf.age >= range.min && calf.age <= range.max
      ).length;
      
      return {
        name: range.name,
        value: count
      };
    });
    
    return distribution;
  }

  async getDailyBirthRate(days: number = 7) {
    // Calculate the date for 7 days ago from now
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0); // Set to midnight
    
    // Get all calves created in the last 7 days
    const recentCalves = await this.calvesRepository
      .createQueryBuilder('calf')
      .where('calf.createdAt >= :startDate', { startDate })
      .orderBy('calf.createdAt', 'ASC')
      .getMany();
    
    // Initialize result object with dates for the last 7 days
    const dailyCounts: { [key: string]: number } = {};
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      const dateString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      dailyCounts[dateString] = 0;
    }
    
    // Count calves born each day
    recentCalves.forEach(calf => {
      const birthDate = calf.createdAt.toISOString().split('T')[0];
      if (dailyCounts[birthDate] !== undefined) {
        dailyCounts[birthDate]++;
      }
    });
    
    // Convert to array format for the frontend
    return Object.entries(dailyCounts).map(([date, count]) => ({
      name: date,
      value: count
    }));
  }

  async getMonthlyMortalityRates(months: number = 6) {
    // Calculate the start date (6 months ago)
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);
    startDate.setDate(1); // First day of that month
    startDate.setHours(0, 0, 0, 0); // Set to midnight
    
    // Get all deceased calves with their death dates
    const deceasedCalves = await this.calvesRepository
      .createQueryBuilder('calf')
      .where('calf.isAlive = :isAlive', { isAlive: false })
      .andWhere('calf.updatedAt >= :startDate', { startDate })
      .orderBy('calf.updatedAt', 'ASC')
      .getMany();
    
    // Get monthly totals of all calves for percentage calculation
    const monthlyTotals: { [key: string]: number } = {};
    for (let i = 0; i < months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - (months - 1 - i));
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      // Count all calves that existed in that month
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const totalCalvesInMonth = await this.calvesRepository
        .createQueryBuilder('calf')
        .where('calf.createdAt <= :monthEnd', { monthEnd })
        .getCount();
      
      monthlyTotals[monthKey] = totalCalvesInMonth;
    }
    
    // Initialize result with monthly keys
    const monthlyDeaths: { [key: string]: number } = {};
    for (let i = 0; i < months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - (months - 1 - i));
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyDeaths[monthKey] = 0;
    }
    
    // Count deaths per month
    deceasedCalves.forEach(calf => {
      const deathDate = new Date(calf.updatedAt);
      const monthKey = `${deathDate.getFullYear()}-${String(deathDate.getMonth() + 1).padStart(2, '0')}`;
      
      if (monthlyDeaths[monthKey] !== undefined) {
        monthlyDeaths[monthKey]++;
      }
    });
    
    // Convert to array format with mortality rates
    return Object.entries(monthlyDeaths).map(([monthKey, deathCount]) => {
      const [year, month] = monthKey.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, 1);
      const monthName = date.toLocaleString('en-US', { month: 'short' });
      
      const totalCalves = monthlyTotals[monthKey] || 1; // Avoid division by zero
      const mortalityRate = (deathCount / totalCalves) * 100;
      
      return {
        name: `${monthName} ${year}`,
        value: parseFloat(mortalityRate.toFixed(1))
      };
    });
  }

  async searchCalves(params: SearchParams) {
    const { 
      page, 
      limit, 
      health, 
      minAge, 
      maxAge, 
      breed, 
      location, 
      isAlive,
      search
    } = params;
    
    const queryBuilder = this.calvesRepository.createQueryBuilder('calf');
    
    // Apply filters
    if (health) {
      queryBuilder.andWhere('calf.health = :health', { health });
    }
    
    if (minAge !== undefined) {
      queryBuilder.andWhere('calf.age >= :minAge', { minAge });
    }
    
    if (maxAge !== undefined) {
      queryBuilder.andWhere('calf.age <= :maxAge', { maxAge });
    }
    
    if (breed) {
      queryBuilder.andWhere('calf.breed = :breed', { breed });
    }
    
    if (location) {
      queryBuilder.andWhere('calf.location = :location', { location });
    }
    
    if (isAlive !== undefined) {
      queryBuilder.andWhere('calf.isAlive = :isAlive', { isAlive });
    }
    
    // Search across multiple fields
    if (search) {
      queryBuilder.andWhere(
        '(calf.name ILIKE :search OR calf.breed ILIKE :search OR ' +
        'calf.health ILIKE :search OR calf.location ILIKE :search OR ' +
        'CAST(calf.age AS TEXT) LIKE :search OR ' +
        'CAST(calf.weight AS TEXT) LIKE :search)',
        { search: `%${search}%` }
      );
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Add pagination
    queryBuilder.skip(skip).take(limit);
    
    // Execute query
    const [calves, total] = await queryBuilder.getManyAndCount();
    
    // Return paginated results with metadata
    return {
      data: calves,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    };
  }
} 