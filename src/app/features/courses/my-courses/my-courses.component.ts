import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { Course } from '../../../core/models/course.model';
import { CourseService } from '../../../core/services/course.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  enrolledCourses$!: Observable<Course[]>;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.enrolledCourses$ = this.courseService.getEnrolledCourses();
  }
}
