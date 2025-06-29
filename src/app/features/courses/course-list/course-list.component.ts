import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { Course } from '../../../core/models/course.model';
import { CourseService } from '../../../core/services/course.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses$!: Observable<Course[]>;

  topics = ['Programming', 'Algorithms', 'Web Development', 'Databases', 'Mobile', 'Cloud'];
  difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  durations = ['< 4 Weeks', '4-8 Weeks', '8+ Weeks'];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courses$ = this.courseService.getCourses();
  }
}
