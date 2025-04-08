import { useState, useEffect, useCallback } from 'react';
import { Calf, calvesApi } from '@/lib/api-client';

// Hook for fetching all calves
export function useCalves(options: { 
  enabled?: boolean; 
  refetchInterval?: number;
} = {}) {
  const { enabled = true, refetchInterval } = options;
  const [calves, setCalves] = useState<Calf[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const fetchCalves = async () => {
      try {
        setIsLoading(true);
        const data = await calvesApi.getAll();
        setCalves(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch calves:", err);
        setError(err instanceof Error ? err : new Error('Failed to fetch calves'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalves();

    if (refetchInterval) {
      const intervalId = setInterval(fetchCalves, refetchInterval);
      return () => clearInterval(intervalId);
    }
  }, [enabled, refetchInterval]);

  // Function to refetch data on demand
  const refetch = async () => {
    try {
      setIsLoading(true);
      const data = await calvesApi.getAll();
      setCalves(data);
      setError(null);
      return data;
    } catch (err) {
      console.error("Failed to fetch calves:", err);
      setError(err instanceof Error ? err : new Error('Failed to fetch calves'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { calves, isLoading, error, refetch };
}

// Hook for fetching watchlist calves
export function useWatchlistCalves() {
  const [calves, setCalves] = useState<Calf[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchWatchlist = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await calvesApi.getWatchlist();
      setCalves(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch watchlist:", err);
      setError(err instanceof Error ? err : new Error('Failed to fetch watchlist'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  return { calves, isLoading, error, refetch: fetchWatchlist };
}

// Hook for fetching calves by location
export function useCalvesByLocation(location: string) {
  const [calves, setCalves] = useState<Calf[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCalvesByLocation = async () => {
      try {
        setIsLoading(true);
        const data = await calvesApi.getByLocation(location);
        setCalves(data);
        setError(null);
      } catch (err) {
        console.error(`Failed to fetch calves for location ${location}:`, err);
        setError(err instanceof Error ? err : new Error(`Failed to fetch calves for location ${location}`));
      } finally {
        setIsLoading(false);
      }
    };

    if (location) {
      fetchCalvesByLocation();
    } else {
      setCalves([]);
      setIsLoading(false);
    }
  }, [location]);

  return { calves, isLoading, error };
} 