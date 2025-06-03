import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import { MainLayout } from './firstcommit/layout/main-layout/main-layout';
import { Components } from './firstcommit/roadmap/components/components'
import { NotfoundComponent } from './firstcommit/public/notfound.component/notfound.component';

export const routes: Routes = [
  {
    path: '', component: MainLayout,
    children: [
      { path: 'roadmap', component: Components },
      { path: '**', component: NotfoundComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
