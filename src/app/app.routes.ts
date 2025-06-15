import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./membership/home/home').then(m => m.default),
  },
  {
    path: 'home',
    loadComponent: () => import('./membership/home/home').then(m => m.default),
  },
  {
    path: 'plans',
    loadComponent: () => import('./membership/plans/plans').then(m => m.default),
  },
  {
    path: 'roadmap',
    loadComponent: () => import('./roadmap/components/roadmap-componente/roadmap-componente').then(m => m.RoadmapComponente),
  }
];
