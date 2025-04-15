import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  farmSettingsApi,
  systemSettingsApi,
  breedsApi,
  locationsApi,
  healthStatusesApi,
} from '@/lib/api/settings';
import {
  FarmSettings,
  SystemSettings,
  Breed,
  FarmLocation,
  HealthStatus
} from '@/types/settings';

// Farm Settings Hook
export function useFarmSettings() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const { data, error, isLoading } = useSWR('farm-settings', async () => {
    try {
      return await farmSettingsApi.getFarmSettings();
    } catch (error) {
      console.error('Error fetching farm settings:', error);
      throw error;
    }
  });

  const updateFarmSettings = async (settings: Partial<FarmSettings>) => {
    try {
      setIsSaving(true);
      const updatedSettings = await farmSettingsApi.updateFarmSettings(settings);
      mutate('farm-settings', updatedSettings, false);
      toast({
        title: 'Success',
        description: 'Farm settings updated successfully',
      });
      return updatedSettings;
    } catch (error) {
      console.error('Error updating farm settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to update farm settings',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    farmSettings: data,
    isLoading,
    error,
    updateFarmSettings,
    isSaving,
  };
}

// System Settings Hook
export function useSystemSettings() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const { data, error, isLoading } = useSWR('system-settings', async () => {
    try {
      return await systemSettingsApi.getSystemSettings();
    } catch (error) {
      console.error('Error fetching system settings:', error);
      throw error;
    }
  });

  const updateSystemSettings = async (settings: Partial<SystemSettings>) => {
    try {
      setIsSaving(true);
      const updatedSettings = await systemSettingsApi.updateSystemSettings(settings);
      mutate('system-settings', updatedSettings, false);
      toast({
        title: 'Success',
        description: 'System settings updated successfully',
      });
      return updatedSettings;
    } catch (error) {
      console.error('Error updating system settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to update system settings',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    systemSettings: data,
    isLoading,
    error,
    updateSystemSettings,
    isSaving,
  };
}

// Breeds Hook
export function useBreeds(includeInactive: boolean = false) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const { data, error, isLoading } = useSWR(['breeds', includeInactive], async () => {
    try {
      return await breedsApi.getAllBreeds(includeInactive);
    } catch (error) {
      console.error('Error fetching breeds:', error);
      throw error;
    }
  });

  const createBreed = async (breed: Omit<Breed, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsSaving(true);
      const newBreed = await breedsApi.createBreed(breed);
      mutate(['breeds', includeInactive]);
      toast({
        title: 'Success',
        description: 'Breed created successfully',
      });
      return newBreed;
    } catch (error) {
      console.error('Error creating breed:', error);
      toast({
        title: 'Error',
        description: 'Failed to create breed',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const updateBreed = async (id: string, breed: Partial<Breed>) => {
    try {
      setIsSaving(true);
      const updatedBreed = await breedsApi.updateBreed(id, breed);
      mutate(['breeds', includeInactive]);
      toast({
        title: 'Success',
        description: 'Breed updated successfully',
      });
      return updatedBreed;
    } catch (error) {
      console.error('Error updating breed:', error);
      toast({
        title: 'Error',
        description: 'Failed to update breed',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteBreed = async (id: string) => {
    try {
      setIsSaving(true);
      await breedsApi.deleteBreed(id);
      mutate(['breeds', includeInactive]);
      toast({
        title: 'Success',
        description: 'Breed deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting breed:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete breed',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const deactivateBreed = async (id: string) => {
    try {
      setIsSaving(true);
      await breedsApi.deactivateBreed(id);
      mutate(['breeds', includeInactive]);
      toast({
        title: 'Success',
        description: 'Breed deactivated successfully',
      });
    } catch (error) {
      console.error('Error deactivating breed:', error);
      toast({
        title: 'Error',
        description: 'Failed to deactivate breed',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    breeds: data,
    isLoading,
    error,
    createBreed,
    updateBreed,
    deleteBreed,
    deactivateBreed,
    isSaving,
  };
}

// Locations Hook
export function useLocations(includeInactive: boolean = false) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const { data, error, isLoading } = useSWR(['locations', includeInactive], async () => {
    try {
      return await locationsApi.getAllLocations(includeInactive);
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  });

  const createLocation = async (location: Omit<FarmLocation, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsSaving(true);
      const newLocation = await locationsApi.createLocation(location);
      mutate(['locations', includeInactive]);
      toast({
        title: 'Success',
        description: 'Location created successfully',
      });
      return newLocation;
    } catch (error) {
      console.error('Error creating location:', error);
      toast({
        title: 'Error',
        description: 'Failed to create location',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const updateLocation = async (id: string, location: Partial<FarmLocation>) => {
    try {
      setIsSaving(true);
      const updatedLocation = await locationsApi.updateLocation(id, location);
      mutate(['locations', includeInactive]);
      toast({
        title: 'Success',
        description: 'Location updated successfully',
      });
      return updatedLocation;
    } catch (error) {
      console.error('Error updating location:', error);
      toast({
        title: 'Error',
        description: 'Failed to update location',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteLocation = async (id: string) => {
    try {
      setIsSaving(true);
      await locationsApi.deleteLocation(id);
      mutate(['locations', includeInactive]);
      toast({
        title: 'Success',
        description: 'Location deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting location:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete location',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const deactivateLocation = async (id: string) => {
    try {
      setIsSaving(true);
      await locationsApi.deactivateLocation(id);
      mutate(['locations', includeInactive]);
      toast({
        title: 'Success',
        description: 'Location deactivated successfully',
      });
    } catch (error) {
      console.error('Error deactivating location:', error);
      toast({
        title: 'Error',
        description: 'Failed to deactivate location',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    locations: data,
    isLoading,
    error,
    createLocation,
    updateLocation,
    deleteLocation,
    deactivateLocation,
    isSaving,
  };
}

// Health Statuses Hook
export function useHealthStatuses(includeInactive: boolean = false) {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const { data, error, isLoading } = useSWR(['health-statuses', includeInactive], async () => {
    try {
      return await healthStatusesApi.getAllHealthStatuses(includeInactive);
    } catch (error) {
      console.error('Error fetching health statuses:', error);
      throw error;
    }
  });

  const createHealthStatus = async (status: Omit<HealthStatus, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsSaving(true);
      const newStatus = await healthStatusesApi.createHealthStatus(status);
      mutate(['health-statuses', includeInactive]);
      toast({
        title: 'Success',
        description: 'Health status created successfully',
      });
      return newStatus;
    } catch (error) {
      console.error('Error creating health status:', error);
      toast({
        title: 'Error',
        description: 'Failed to create health status',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const updateHealthStatus = async (id: string, status: Partial<HealthStatus>) => {
    try {
      setIsSaving(true);
      const updatedStatus = await healthStatusesApi.updateHealthStatus(id, status);
      mutate(['health-statuses', includeInactive]);
      toast({
        title: 'Success',
        description: 'Health status updated successfully',
      });
      return updatedStatus;
    } catch (error) {
      console.error('Error updating health status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update health status',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteHealthStatus = async (id: string) => {
    try {
      setIsSaving(true);
      await healthStatusesApi.deleteHealthStatus(id);
      mutate(['health-statuses', includeInactive]);
      toast({
        title: 'Success',
        description: 'Health status deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting health status:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete health status',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const deactivateHealthStatus = async (id: string) => {
    try {
      setIsSaving(true);
      await healthStatusesApi.deactivateHealthStatus(id);
      mutate(['health-statuses', includeInactive]);
      toast({
        title: 'Success',
        description: 'Health status deactivated successfully',
      });
    } catch (error) {
      console.error('Error deactivating health status:', error);
      toast({
        title: 'Error',
        description: 'Failed to deactivate health status',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    healthStatuses: data,
    isLoading,
    error,
    createHealthStatus,
    updateHealthStatus,
    deleteHealthStatus,
    deactivateHealthStatus,
    isSaving,
  };
} 