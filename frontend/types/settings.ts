// Farm Settings Types
export interface FarmSettings {
  id: string;
  farmName: string;
  farmLocation?: string;
  timeZone: string;
  currency: string;
  logoUrl?: string;
  description?: string;
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
}

// System Settings Types
export interface SystemSettings {
  id: string;
  autoBackup: boolean;
  dataSyncEnabled: boolean;
  emailNotifications: boolean;
  dataRetentionDays: number;
  darkModeEnabled: boolean;
  defaultLanguage: string;
  notificationSettings?: Record<string, any>;
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
}

// Breed Types
export interface Breed {
  id: string;
  name: string;
  description?: string;
  avgWeight?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Farm Location Types
export interface FarmLocation {
  id: string;
  name: string;
  description?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
  isActive: boolean;
  capacity?: number;
  notes?: string;
  managerId?: string;
  createdAt: string;
  updatedAt: string;
}

// Health Status Types
export interface HealthStatus {
  id: string;
  name: string;
  description?: string;
  color: string;
  requiresAttention: boolean;
  isEmergency: boolean;
  isActive: boolean;
  displayOrder?: number;
  createdAt: string;
  updatedAt: string;
} 