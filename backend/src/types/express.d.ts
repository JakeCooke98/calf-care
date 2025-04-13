import { UserRole } from '../users/entities/user.entity';

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      role: UserRole;
      isActive: boolean;
    }
  }
} 