import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { Roadmap } from '../../../core/models/roadmap.model';
import { RoadmapService } from '../../../core/services/roadmap.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-roadmap-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './roadmap-list.component.html',
  styleUrl: './roadmap-list.component.css'
})
export class RoadmapListComponent implements OnInit {
  private allRoadmaps$ = new BehaviorSubject<Roadmap[]>([]);
  filteredRoadmaps$!: Observable<Roadmap[]>;

  categories = ['All', 'Web Development', 'Data Science', 'Mobile Development'];
  activeLink = this.categories[0];

  constructor(private roadmapService: RoadmapService) {}

  ngOnInit(): void {
    this.roadmapService.getRoadmaps().subscribe(roadmaps => {
      this.allRoadmaps$.next(roadmaps);
    });
    this.applyFilter('All');
  }

  applyFilter(category: string): void {
    this.activeLink = category;
    this.filteredRoadmaps$ = this.allRoadmaps$.pipe(
      map(roadmaps => {
        if (category === 'All') {
          return roadmaps;
        }
        return roadmaps.filter(roadmap => roadmap.category === category);
      })
    );
  }
}
