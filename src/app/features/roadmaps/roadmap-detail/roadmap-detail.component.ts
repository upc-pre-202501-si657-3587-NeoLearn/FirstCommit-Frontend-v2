import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Roadmap } from '../../../core/models/roadmap.model';
import { RoadmapService } from '../../../core/services/roadmap.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';

@Component({
  selector: 'app-roadmap-detail',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './roadmap-detail.component.html',
  styleUrls: ['./roadmap-detail.component.css']
})
export class RoadmapDetailComponent implements OnInit {
  roadmap$!: Observable<Roadmap>;

  constructor(
    private route: ActivatedRoute,
    private roadmapService: RoadmapService
  ) {}

  ngOnInit(): void {
    const roadmapId = Number(this.route.snapshot.paramMap.get('id'));
    if (roadmapId) {
      this.roadmap$ = this.roadmapService.getRoadmapById(roadmapId);
    }
  }
}
