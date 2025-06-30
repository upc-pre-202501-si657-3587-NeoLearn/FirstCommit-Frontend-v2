import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project$!: Observable<Project>;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    if (projectId) {
      this.project$ = this.projectService.getProjectById(projectId);
    }
  }
}
