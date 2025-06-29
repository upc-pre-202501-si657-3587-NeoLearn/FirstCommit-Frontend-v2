export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  views?: number;
  ratingDistribution?: { stars: number; percent: number }[];
}
