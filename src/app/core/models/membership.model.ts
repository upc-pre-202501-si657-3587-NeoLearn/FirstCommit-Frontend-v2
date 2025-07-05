export interface MembershipPlan {
  id: number;
  name: string;
  price: string; // Se usará string para manejar "Gratuito"
  period: string;
  features: string[];
  isFeatured: boolean; // Se mantiene para el diseño
}
