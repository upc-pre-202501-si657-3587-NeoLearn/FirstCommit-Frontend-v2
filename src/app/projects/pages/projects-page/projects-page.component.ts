import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { ProjectFormComponent } from '../../components/project-form/project-form.component';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatIconModule, MatDialogModule,
    ProjectCardComponent, ProjectFormComponent, MatProgressSpinnerModule
  ],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css'
})
export class ProjectsPageComponent implements OnInit {
  public projects$!: Observable<Project[]>;

  constructor(private projectService: ProjectService, public dialog: MatDialog) {}

  ngOnInit(): void { this.loadProjects(); }

  loadProjects(): void {
    this.projects$ = this.projectService.getProjects().pipe(
      catchError(error => {
        console.error('Error al cargar los proyectos:', error);
        return of([]);
      })
    );
  }

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newProjectData: Partial<Project> = {
          ...result,
          ownerUserId: 101,
          sendbirdChannelId: `neolearn_project_channel_new_${Date.now()}`
        };
        this.projectService.createProject(newProjectData).subscribe({
          next: () => {
            this.loadProjects();
          },
          error: (err) => console.error('Error al crear el proyecto:', err)
        });
      }
    });
  }
}
