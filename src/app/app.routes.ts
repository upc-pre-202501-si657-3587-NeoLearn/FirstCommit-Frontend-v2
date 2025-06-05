import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./membership/home/home').then(m => m.default),
  },
  {
    path: 'plans',
    loadComponent: () => import('./membership/plans/plans').then(m => m.default),
  },
  {
    path: 'payment',
    loadComponent: () => import('./membership/payment/payment').then(m => m.default)
  }
];
