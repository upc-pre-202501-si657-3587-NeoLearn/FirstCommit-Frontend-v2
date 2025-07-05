import {Course} from './course.model';

export interface Roadmap {
  id: string;
  name: string;
  description: string;
  category: string; // Se añade para el filtro
  imageUrl: string; // Se añade para la imagen
  courses: Partial<Course>[];
}
