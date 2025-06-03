import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import { MainLayout } from './firstcommit/layout/main-layout/main-layout';
import { Components } from './firstcommit/roadmap/components/components'
import { NotfoundComponent } from './firstcommit/public/notfound.component/notfound.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./membership/home/home').then(m => m.default),
  },
  {
    path: 'plans',
    loadComponent: () => import('./membership/plans/plans').then(m => m.default),
  },
  // {
  //   path: 'payment',
  //   loadComponent: () => import('./membership/payment/payment').then(m => m.default)
  // }
];
