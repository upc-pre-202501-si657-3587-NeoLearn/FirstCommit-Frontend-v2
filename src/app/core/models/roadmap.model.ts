import { Course } from './course.model';

export interface Roadmap {
  id: number;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  courses: Course[];
}
