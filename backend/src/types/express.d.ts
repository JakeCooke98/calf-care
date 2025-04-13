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

// This empty export is required to make TypeScript treat this file as a module
export {}; 