import apiClient from '../api-client';
import { 
  FarmSettings, 
  SystemSettings, 
  Breed, 
  FarmLocation, 
  HealthStatus 
} from '@/types/settings';

// Farm Settings API
export const farmSettingsApi = {
  getFarmSettings: async (): Promise<FarmSettings> => {
    const { data } = await apiClient.get('/settings/farm');
    return data;
  },
  
  updateFarmSettings: async (settings: Partial<FarmSettings>): Promise<FarmSettings> => {
    const { data } = await apiClient.put('/settings/farm', settings);
    return data;
  }
};

// System Settings API
export const systemSettingsApi = {
  getSystemSettings: async (): Promise<SystemSettings> => {
    const { data } = await apiClient.get('/settings/system');
    return data;
  },
  
  updateSystemSettings: async (settings: Partial<SystemSettings>): Promise<SystemSettings> => {
    const { data } = await apiClient.put('/settings/system', settings);
    return data;
  }
};

// Breeds API
export const breedsApi = {
  getAllBreeds: async (includeInactive: boolean = false): Promise<Breed[]> => {
    const { data } = await apiClient.get('/settings/breeds', {
      params: { includeInactive }
    });
    return data;
  },
  
  getBreedById: async (id: string): Promise<Breed> => {
    const { data } = await apiClient.get(`/settings/breeds/${id}`);
    return data;
  },
  
  createBreed: async (breed: Omit<Breed, 'id' | 'createdAt' | 'updatedAt'>): Promise<Breed> => {
    const { data } = await apiClient.post('/settings/breeds', breed);
    return data;
  },
  
  updateBreed: async (id: string, breed: Partial<Breed>): Promise<Breed> => {
    const { data } = await apiClient.put(`/settings/breeds/${id}`, breed);
    return data;
  },
  
  deleteBreed: async (id: string): Promise<void> => {
    await apiClient.delete(`/settings/breeds/${id}`);
  },
  
  deactivateBreed: async (id: string): Promise<Breed> => {
    const { data } = await apiClient.put(`/settings/breeds/${id}/deactivate`);
    return data;
  }
};

// Farm Locations API
export const locationsApi = {
  getAllLocations: async (includeInactive: boolean = false): Promise<FarmLocation[]> => {
    const { data } = await apiClient.get('/settings/locations', {
      params: { includeInactive }
    });
    return data;
  },
  
  getLocationById: async (id: string): Promise<FarmLocation> => {
    const { data } = await apiClient.get(`/settings/locations/${id}`);
    return data;
  },
  
  createLocation: async (location: Omit<FarmLocation, 'id' | 'createdAt' | 'updatedAt'>): Promise<FarmLocation> => {
    const { data } = await apiClient.post('/settings/locations', location);
    return data;
  },
  
  updateLocation: async (id: string, location: Partial<FarmLocation>): Promise<FarmLocation> => {
    const { data } = await apiClient.put(`/settings/locations/${id}`, location);
    return data;
  },
  
  deleteLocation: async (id: string): Promise<void> => {
    await apiClient.delete(`/settings/locations/${id}`);
  },
  
  deactivateLocation: async (id: string): Promise<FarmLocation> => {
    const { data } = await apiClient.put(`/settings/locations/${id}/deactivate`);
    return data;
  }
};

// Health Statuses API
export const healthStatusesApi = {
  getAllHealthStatuses: async (includeInactive: boolean = false): Promise<HealthStatus[]> => {
    const { data } = await apiClient.get('/settings/health-statuses', {
      params: { includeInactive }
    });
    return data;
  },
  
  getHealthStatusById: async (id: string): Promise<HealthStatus> => {
    const { data } = await apiClient.get(`/settings/health-statuses/${id}`);
    return data;
  },
  
  createHealthStatus: async (status: Omit<HealthStatus, 'id' | 'createdAt' | 'updatedAt'>): Promise<HealthStatus> => {
    const { data } = await apiClient.post('/settings/health-statuses', status);
    return data;
  },
  
  updateHealthStatus: async (id: string, status: Partial<HealthStatus>): Promise<HealthStatus> => {
    const { data } = await apiClient.put(`/settings/health-statuses/${id}`, status);
    return data;
  },
  
  deleteHealthStatus: async (id: string): Promise<void> => {
    await apiClient.delete(`/settings/health-statuses/${id}`);
  },
  
  deactivateHealthStatus: async (id: string): Promise<HealthStatus> => {
    const { data } = await apiClient.put(`/settings/health-statuses/${id}/deactivate`);
    return data;
  }
}; 