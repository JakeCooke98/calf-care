/**
 * API client for backend communication
 */

// Base configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

// Error handling utility
class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

// Generic fetch wrapper with error handling
async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // If parsing JSON fails, use status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(`API Error (${response.status}): ${errorMessage}`);
  }
  
  return response.json() as Promise<T>;
}

// Type definitions
export interface Calf {
  id: string;  // or number, depending on your backend
  name: string;
  age: number;
  weight: number;
  health: string;
  breed?: string;
  gender?: string;
  location?: string;
  isAlive: boolean;
  inWatchlist: boolean;
  createdAt: string;
  updatedAt: string;
}

// Types for dashboard data
export interface DashboardStats {
  totalCount: number;
  oneDayOldCount: number; // Count of calves born yesterday (1 day old)
  twoDayOldCount: number; // Count of calves born two days ago (2 days old)
  watchlistCount: number;
  aliveCount: number;
  deceasedCount: number;
  averageWeight: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

// API endpoints for calves
export const calvesApi = {
  // Get all calves
  getAll: async (): Promise<Calf[]> => {
    return fetchApi<Calf[]>('/calves');
  },
  
  // Get calf by ID
  getById: async (id: number): Promise<Calf> => {
    return fetchApi<Calf>(`/calves/${id}`);
  },
  
  // Create new calf
  create: async (calf: Omit<Calf, 'id' | 'createdAt' | 'updatedAt'>): Promise<Calf> => {
    return fetchApi<Calf>('/calves', {
      method: 'POST',
      body: JSON.stringify(calf),
    });
  },
  
  // Update calf
  update: async (id: number, calf: Partial<Calf>): Promise<Calf> => {
    return fetchApi<Calf>(`/calves/${id}`, {
      method: 'PUT',
      body: JSON.stringify(calf),
    });
  },
  
  // Delete calf
  delete: async (id: number): Promise<void> => {
    return fetchApi<void>(`/calves/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Get watchlist calves
  getWatchlist: async (): Promise<Calf[]> => {
    return fetchApi<Calf[]>('/calves/watchlist');
  },
  
  // Filter by alive status
  getByAliveStatus: async (isAlive: boolean): Promise<Calf[]> => {
    return fetchApi<Calf[]>(`/calves/alive/${isAlive}`);
  },
  
  // Filter by location
  getByLocation: async (location: string): Promise<Calf[]> => {
    return fetchApi<Calf[]>(`/calves/location/${encodeURIComponent(location)}`);
  },
  
  // Get dashboard statistics
  getStats: async (): Promise<DashboardStats> => {
    return fetchApi<DashboardStats>('/calves/stats');
  },
  
  // Get recent calves
  getRecentCalves: async (days: number = 7): Promise<Calf[]> => {
    return fetchApi<Calf[]>(`/calves/recent?days=${days}`);
  },
  
  // Get health distribution
  getHealthDistribution: async (): Promise<ChartDataPoint[]> => {
    return fetchApi<ChartDataPoint[]>('/calves/health-distribution');
  },
  
  // Get breed distribution
  getBreedDistribution: async (): Promise<ChartDataPoint[]> => {
    return fetchApi<ChartDataPoint[]>('/calves/breed-distribution');
  },
  
  // Get gender distribution
  getGenderDistribution: async (): Promise<ChartDataPoint[]> => {
    return fetchApi<ChartDataPoint[]>('/calves/gender-distribution');
  },
  
  // Get location distribution
  getLocationDistribution: async (): Promise<ChartDataPoint[]> => {
    return fetchApi<ChartDataPoint[]>('/calves/location-distribution');
  },
  
  // Get age distribution
  getAgeDistribution: async (): Promise<ChartDataPoint[]> => {
    return fetchApi<ChartDataPoint[]>('/calves/age-distribution');
  },
};

// Dashboard-specific endpoints
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    return fetchApi<DashboardStats>('/calves/stats');
  },
  
  getRecentCalves: async (days: number = 7): Promise<Calf[]> => {
    return fetchApi<Calf[]>(`/calves/recent?days=${days}`);
  },
  
  getHealthDistribution: async (): Promise<ChartDataPoint[]> => {
    return fetchApi<ChartDataPoint[]>('/calves/health-distribution');
  },
  
  getBreedDistribution: async (): Promise<ChartDataPoint[]> => {
    return fetchApi<ChartDataPoint[]>('/calves/breed-distribution');
  },
  
  getGenderDistribution: async (): Promise<ChartDataPoint[]> => {
    return fetchApi<ChartDataPoint[]>('/calves/gender-distribution');
  },
  
  getLocationDistribution: async (): Promise<ChartDataPoint[]> => {
    return fetchApi<ChartDataPoint[]>('/calves/location-distribution');
  },
  
  getAgeDistribution: async (): Promise<ChartDataPoint[]> => {
    return fetchApi<ChartDataPoint[]>('/calves/age-distribution');
  },
};

// Export other API services as needed (authentication, etc.)
export const authApi = {
  // Implement authentication endpoints
  // ...
};

export default {
  calves: calvesApi,
  auth: authApi,
  dashboard: dashboardApi,
}; 