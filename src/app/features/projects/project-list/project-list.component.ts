import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { Project } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
  featuredProjects$!: Observable<Project[]>;
  allProjects$!: Observable<Project[]>;

  displayedColumns: string[] = ['name', 'description', 'skillsRequired', 'contributionGuidelines'];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    const projects$ = this.projectService.getProjects();
    this.featuredProjects$ = projects$.pipe(
      map(projects => projects.filter(p => p.featured))
    );
    this.allProjects$ = projects$.pipe(
      map(projects => projects)
    );
  }
}
