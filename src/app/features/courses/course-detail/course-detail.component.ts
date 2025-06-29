import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../../../core/models/course.model';
import { CourseService } from '../../../core/services/course.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, DecimalPipe],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  course$!: Observable<Course>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));
    if (courseId) {
      this.course$ = this.courseService.getCourseById(courseId);
    }
  }
}
