import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Course } from '../../../core/models/course.model';
import { CourseService } from '../../../core/services/course.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, DecimalPipe],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  public course$!: Observable<Course>;
  public userRating = 0;
  private courseId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.courseId) {
      this.loadCourse();
    }
  }

  loadCourse(): void {
    this.course$ = this.courseService.getCourseById(this.courseId).pipe(
      tap(course => this.userRating = Math.round(course.averageRating))
    );
  }

  enroll(course: Course): void {
    if (!course.id) return;
    this.courseService.enrollInCourse(course.id).subscribe({
      next: () => {
        const snackBarRef = this.snackBar.open(`¡Te has inscrito en ${course.title}!`, 'Empezar a aprender', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        snackBarRef.onAction().subscribe(() => {
          this.router.navigate(['/courses', course.id, 'lesson']);
        });
      },
      error: (err) => {
        this.snackBar.open('Error during enrollment.', 'Close', { duration: 3000 });
      }
    });
  }

  rateCourse(rating: number): void {
    this.userRating = rating;
    this.courseService.rateCourse(this.courseId, rating).subscribe({
      next: () => {
        this.snackBar.open('Thanks for your rating!', 'Close', { duration: 3000 });
        this.loadCourse();
      },
      error: (err) => {
        this.snackBar.open('Failed to submit rating.', 'Close', { duration: 3000 });
      }
    });
  }
}
