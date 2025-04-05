import { useEffect, useState } from 'react';
import { dashboardApi, DashboardStats, ChartDataPoint, Calf } from '@/lib/api-client';

// Hook for dashboard statistics
export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const data = await dashboardApi.getStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch dashboard stats'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading, error };
}

// Hook for chart data
export function useChartData(chartType: 'health' | 'breed' | 'gender' | 'location' | 'age') {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        let result: ChartDataPoint[];
        switch (chartType) {
          case 'health':
            result = await dashboardApi.getHealthDistribution();
            break;
          case 'breed':
            result = await dashboardApi.getBreedDistribution();
            break;
          case 'gender':
            result = await dashboardApi.getGenderDistribution();
            break;
          case 'location':
            result = await dashboardApi.getLocationDistribution();
            break;
          case 'age':
            result = await dashboardApi.getAgeDistribution();
            break;
          default:
            result = [];
        }
        
        setData(result);
      } catch (err) {
        console.error(`Failed to fetch ${chartType} distribution:`, err);
        setError(err instanceof Error ? err : new Error(`Failed to fetch ${chartType} distribution`));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [chartType]);

  return { data, isLoading, error };
}

// Hook for recent calves
export function useRecentCalves(days: number = 7) {
  const [calves, setCalves] = useState<Calf[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRecentCalves = async () => {
      try {
        setIsLoading(true);
        const data = await dashboardApi.getRecentCalves(days);
        setCalves(data);
      } catch (err) {
        console.error('Failed to fetch recent calves:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch recent calves'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentCalves();
  }, [days]);

  return { calves, isLoading, error };
} 