import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../core/models/course.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  courses$: Observable<Course[]>;
  displayedColumns: string[] = ['title', 'category', 'published', 'actions'];

  constructor(
    private courseService: CourseService,
    private snackBar: MatSnackBar
  ) {
    this.courses$ = this.courseService.getCourses(true);
  }

  ngOnInit(): void {}

  publishCourse(course: Course): void {
    if (!course.id) return;
    this.courseService.publishCourse(course.id).subscribe(() => {
      this.snackBar.open(`Course "${course.title}" published!`, 'Close', { duration: 3000 });
      this.courses$ = this.courseService.getCourses(true);
    });
  }

  deleteCourse(course: Course): void {
    if (!course.id) return;
    if (confirm(`Are you sure you want to delete "${course.title}"?`)) {
      this.courseService.deleteCourse(course.id).subscribe(() => {
        this.snackBar.open(`Course "${course.title}" deleted.`, 'Close', { duration: 3000 });
        this.courses$ = this.courseService.getCourses(true);
      });
    }
  }
}
