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
  id: number;
  projectId: number;
  userId: number;
  rol: 'ADMINISTRATOR' | 'MEMBER';
}

export interface Task {
  id: number;
  projectId: number;
  nombre: string;
  descripcion: string;
  idUsuarioAsignado: number;
  fechaVencimiento: string;
  estado: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface Invitation {
  id: number;
  projectId: number;
  idUsuarioInvitado: number;
  idUsuarioInvitador: number;
  estado: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  fechaEnvio: string;
}

export interface Message {
  id: number;
  projectId: number;
  userId: number;
  username: string;
  content: string;
  timestamp: string;
}

export interface Requirement {
  id: number;
  projectId: number;
  descripcion: string;
  tipo: 'FUNCIONAL' | 'NO_FUNCIONAL';
}

export interface Technology {
  id: number;
  projectId: number;
  nombre: string;
}

export interface Resource {
  id: number;
  projectId: number;
  nombre: string;
  url: string;
  tipo: 'LINK' | 'FILE' | 'DOCUMENT';
}
