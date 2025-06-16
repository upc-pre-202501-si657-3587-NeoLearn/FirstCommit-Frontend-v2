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
    loadComponent: () => import('./roadmap/components/roadmaps/roadmaps').then(m => m.Roadmaps)
  },
  {
    path: 'courses',
    loadComponent: () => import('./roadmap/components/courses/courses').then(m => m.Courses)
  }
];
