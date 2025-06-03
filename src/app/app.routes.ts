import { Routes } from '@angular/router';
import { MainLayout } from './firstcommit/layout/main-layout/main-layout';
import { Components } from './firstcommit/roadmap/components/components'
export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'roadmap', component: Components },
    ]
  }
];
