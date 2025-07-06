import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CourseListComponent } from './features/courses/course-list/course-list.component';
import { CourseDetailComponent } from './features/courses/course-detail/course-detail.component';
import { LessonViewComponent } from './features/courses/lesson-view/lesson-view.component';
import { RoadmapListComponent } from './features/roadmaps/roadmap-list/roadmap-list.component';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RoadmapDetailComponent } from './features/roadmaps/roadmap-detail/roadmap-detail.component';
import { ProjectDetailComponent } from './features/projects/project-detail/project-detail.component';
import { MembershipPlansComponent } from './features/memberships/membership-plans/membership-plans.component';
import { ProfileComponent } from './features/profile/profile.component';
import { CourseFormComponent } from './features/admin/course-form/course-form.component';
import { authGuard } from './core/guards/auth.guard';
import { InvitationsComponent } from './features/invitations/invitations.component';
import { adminGuard } from './core/guards/admin.guard';
import { CourseManagementComponent } from './features/admin/course-management/course-management.component';
import { PlanManagementComponent } from './features/admin/plan-management/plan-management.component';
import { MyCoursesComponent } from './features/courses/my-courses/my-courses.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'courses', pathMatch: 'full' },
      { path: 'courses', component: CourseListComponent },
      { path: 'courses/new', component: CourseFormComponent, canActivate: [adminGuard] },
      { path: 'courses/:id', component: CourseDetailComponent },
      { path: 'courses/:id/lesson', component: LessonViewComponent },
      { path: 'my-courses', component: MyCoursesComponent },
      { path: 'roadmaps', component: RoadmapListComponent },
      { path: 'roadmaps/:id', component: RoadmapDetailComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'projects/:id', component: ProjectDetailComponent },
      { path: 'memberships', component: MembershipPlansComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'invitations', component: InvitationsComponent },
      {
        path: 'admin/courses',
        component: CourseManagementComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'admin/plans',
        component: PlanManagementComponent,
        canActivate: [adminGuard]
      }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];
