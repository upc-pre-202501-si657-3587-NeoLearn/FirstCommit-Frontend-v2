export interface Project {
  id: number;
  nombre: string;
  descripcionGeneral: string;
  urlRepositorio: string;
  usernameCreador: string;
  fechaCreacion: string;
  esPredefinido: boolean;
  estado: string;
  imageUrl?: string;
}

export interface ProjectMember {
  idProyecto: number;
  idUsuario: number;
  rol: 'ADMINISTRATOR' | 'MEMBER';
  fechaUnion: string;
  username?: string;
  avatarUrl?: string;
}

export interface Task {
  id: number;
  idProyecto: number;
  nombre: string;
  descripcion: string;
  idUsuarioAsignado: number;
  fechaCreacion: string;
  fechaVencimiento: string;
  estado: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

// NUEVA INTERFAZ PARA LAS INVITACIONES
export interface Invitation {
  id: number;
  idProyecto: number;
  idUsuarioInvitado: number;
  idUsuarioInvitador: number;
  estado: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  fechaEnvio: string;
}
