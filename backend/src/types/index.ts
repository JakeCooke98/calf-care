import { UserRole } from '../users/entities/user.entity';

/**
 * Interface representing an authenticated user
 */
export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
} 