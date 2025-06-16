import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DatePipe,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './project-detail-page.component.html',
  styleUrl: './project-detail-page.component.css'
})
export class ProjectDetailPageComponent implements OnInit {
  project$!: Observable<Project | null>;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.project$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.projectService.getProjectById(id).pipe(
            catchError(error => {
              console.error('Error fetching project:', error);
              return of(null); // Devuelve null si hay un error
            })
          );
        }
        return of(null); // Devuelve null si no hay ID
      })
    );
  }
}
