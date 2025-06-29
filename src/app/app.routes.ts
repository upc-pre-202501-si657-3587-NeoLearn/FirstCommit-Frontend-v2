import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CourseListComponent } from './features/courses/course-list/course-list.component';
import { CourseDetailComponent } from './features/courses/course-detail/course-detail.component';
import { RoadmapListComponent } from './features/roadmaps/roadmap-list/roadmap-list.component';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RoadmapDetailComponent } from './features/roadmaps/roadmap-detail/roadmap-detail.component';
import { ProjectDetailComponent } from './features/projects/project-detail/project-detail.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'courses', pathMatch: 'full' },
      { path: 'courses', component: CourseListComponent },
      { path: 'courses/:id', component: CourseDetailComponent },
      { path: 'roadmaps', component: RoadmapListComponent },
      { path: 'roadmaps/:id', component: RoadmapDetailComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'projects/:id', component: ProjectDetailComponent }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'courses' }
];
