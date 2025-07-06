export interface Course {
  id?: number;
  title: string;
  description: string;
  category: string;
  instructorId: string;
  published: boolean;
  averageRating: number;
  imageUrl?: string;
  difficulty?: string;
  duration?: string;
  views?: number;
  reviews?: number;
}

export interface CourseDetails extends Course {
  content: {
    theory: string;
    quiz: string;
    coding: string;
  };
}
