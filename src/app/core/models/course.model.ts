export interface Course {
  id?: number;
  title: string;
  description: string;
  category: string;
  instructorId: string;
  published: boolean;
  averageRating: number;
  // Propiedades añadidas para que coincidan con el HTML y la data de prueba
  imageUrl?: string;
  difficulty?: string;
  duration?: string;
  views?: number;
  reviews?: number;
  ratingDistribution?: { stars: number; percent: number }[];
}
