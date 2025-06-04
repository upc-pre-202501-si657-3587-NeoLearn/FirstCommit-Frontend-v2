import {RouterModule, Routes} from '@angular/router';
import {RoadmapComponente} from './firstcommit/roadmap/components/roadmap-componente/roadmap-componente';

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
    loadComponent: () => import('./firstcommit/roadmap/components/roadmap-componente/roadmap-componente').then(m => m.RoadmapComponente),
  }
];
