export interface UserProfile {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  avatarUrl: string;
}

export interface User {
  id: number;
  nombreUsuario: string;
  email: string;
  roles: string[];
}
