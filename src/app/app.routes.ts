import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
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
    path: 'projects',
    loadComponent: () => import('./projects/pages/projects-page/projects-page.component').then(m => m.ProjectsPageComponent)
  },
  {
    path: 'projects/:id',
    loadComponent: () => import('./projects/pages/project-detail-page/project-detail-page.component').then(m => m.ProjectDetailPageComponent)
  }
];
