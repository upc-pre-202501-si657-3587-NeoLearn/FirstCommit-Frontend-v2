export interface UserProfile {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  avatarUrl: string;
}

// NUEVA INTERFAZ PARA BÚSQUEDA DE USUARIOS
export interface User {
  id: number;
  nombreUsuario: string;
  email: string;
}
