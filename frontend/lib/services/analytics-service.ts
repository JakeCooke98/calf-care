import { Calf } from '@/lib/api-client';

export interface CalfStats {
  totalCount: number;
  healthDistribution: Record<string, number>;
  breedDistribution: Record<string, number>;
  genderDistribution: Record<string, number>;
  locationDistribution: Record<string, number>;
  averageWeight: number;
  ageDistribution: Record<string, number>;
  watchlistCount: number;
  aliveCount: number;
  deceasedCount: number;
}

export function calculateCalfStats(calves: Calf[]): CalfStats {
  // Count of calves
  const totalCount = calves.length;
  
  if (totalCount === 0) {
    return {
      totalCount: 0,
      healthDistribution: {},
      breedDistribution: {},
      genderDistribution: {},
      locationDistribution: {},
      averageWeight: 0,
      ageDistribution: {},
      watchlistCount: 0,
      aliveCount: 0,
      deceasedCount: 0,
    };
  }
  
  // Health distribution
  const healthDistribution = calves.reduce((acc, calf) => {
    acc[calf.health] = (acc[calf.health] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Breed distribution
  const breedDistribution = calves.reduce((acc, calf) => {
    const breed = calf.breed || 'Unknown';
    acc[breed] = (acc[breed] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Gender distribution
  const genderDistribution = calves.reduce((acc, calf) => {
    const gender = calf.gender || 'Unknown';
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Location distribution
  const locationDistribution = calves.reduce((acc, calf) => {
    const location = calf.location || 'Unknown';
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Average weight
  const totalWeight = calves.reduce((sum, calf) => sum + calf.weight, 0);
  const averageWeight = totalWeight / totalCount;
  
  // Age distribution (group by ranges: 0-30, 31-90, 91-180, 181-365, 366+)
  const ageRanges = {
    '0-30 days': (age: number) => age >= 0 && age <= 30,
    '31-90 days': (age: number) => age >= 31 && age <= 90,
    '91-180 days': (age: number) => age >= 91 && age <= 180,
    '181-365 days': (age: number) => age >= 181 && age <= 365,
    '366+ days': (age: number) => age > 365,
  };
  
  const ageDistribution = Object.entries(ageRanges).reduce(
    (acc, [range, condition]) => {
      acc[range] = calves.filter(calf => condition(calf.age)).length;
      return acc;
    },
    {} as Record<string, number>
  );
  
  // Watchlist count
  const watchlistCount = calves.filter(calf => calf.inWatchlist).length;
  
  // Alive/deceased counts
  const aliveCount = calves.filter(calf => calf.isAlive).length;
  const deceasedCount = totalCount - aliveCount;
  
  return {
    totalCount,
    healthDistribution,
    breedDistribution,
    genderDistribution,
    locationDistribution,
    averageWeight,
    ageDistribution,
    watchlistCount,
    aliveCount,
    deceasedCount,
  };
}

// Calculate newly added calves (last 7 days)
export function getNewCalvesCount(calves: Calf[]): number {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  return calves.filter(calf => {
    const createdAt = new Date(calf.createdAt);
    return createdAt >= oneWeekAgo;
  }).length;
}

// Format statistics into chart-friendly data
export function formatForCharts(data: Record<string, number>): Array<{ name: string; value: number }> {
  return Object.entries(data).map(([name, value]) => ({ name, value }));
} 