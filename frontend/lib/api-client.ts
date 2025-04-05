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
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.message || 'An error occurred while fetching data',
      response.status
    );
  }
  
  return data as T;
}

// Type definitions
export interface Calf {
  id: number;
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
};

// Export other API services as needed (authentication, etc.)
export const authApi = {
  // Implement authentication endpoints
  // ...
};

export default {
  calves: calvesApi,
  auth: authApi,
}; 