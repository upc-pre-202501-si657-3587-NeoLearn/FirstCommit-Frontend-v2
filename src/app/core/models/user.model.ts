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

export interface SignInResource {
  username: string;
  password: string;
}

export interface SignUpResource {
  fullName: string;
  username: string;
  password: string;
}

export interface AuthenticatedUserResource {
  id: number;
  username: string;
  token: string;
}
