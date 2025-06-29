import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { Roadmap } from '../../../core/models/roadmap.model';
import { RoadmapService } from '../../../core/services/roadmap.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-roadmap-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './roadmap-list.component.html',
  styleUrl: './roadmap-list.component.css'
})
export class RoadmapListComponent implements OnInit {
  roadmaps$!: Observable<Roadmap[]>;
  categories = ['All', 'Web Development', 'Data Science', 'Mobile Development'];
  activeLink = this.categories[0];

  constructor(private roadmapService: RoadmapService) {}

  ngOnInit(): void {
    this.roadmaps$ = this.roadmapService.getRoadmaps();
  }
}
