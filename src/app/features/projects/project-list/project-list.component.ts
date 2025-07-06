import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { Project } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
  featuredProjects$!: Observable<Project[]>;
  allProjects$!: Observable<Project[]>;
  private searchTerm$ = new BehaviorSubject<string>('');

  displayedColumns: string[] = ['nombre', 'descripcionGeneral', 'urlRepositorio'];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    const projects$ = this.projectService.getProjects();

    this.featuredProjects$ = projects$.pipe(
      map(projects => projects.filter((p: Project) => p.esPredefinido))
    );

    this.allProjects$ = combineLatest([
      projects$,
      this.searchTerm$.pipe(startWith(''))
    ]).pipe(
      map(([projects, term]: [Project[], string]) =>
        projects.filter((project: Project) =>
          project.nombre.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm$.next(term);
  }
}
