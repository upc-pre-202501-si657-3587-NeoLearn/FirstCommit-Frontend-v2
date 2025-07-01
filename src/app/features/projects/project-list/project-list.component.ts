import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { Project } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
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

  private allProjects$ = new BehaviorSubject<Project[]>([]);
  filteredProjects$!: Observable<Project[]>;

  private searchTerm$ = new BehaviorSubject<string>('');

  displayedColumns: string[] = ['name', 'description', 'skillsRequired', 'contributionGuidelines'];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    const projects$ = this.projectService.getProjects();

    this.featuredProjects$ = projects$.pipe(
      map(projects => projects.filter((p: Project) => p.featured))
    );

    projects$.subscribe(projs => this.allProjects$.next(projs));

    this.filteredProjects$ = combineLatest([
      this.allProjects$,
      this.searchTerm$
    ]).pipe(
      map(([projects, term]) =>
        projects.filter((project: Project) =>
          project.name.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm$.next(term);
  }
}
