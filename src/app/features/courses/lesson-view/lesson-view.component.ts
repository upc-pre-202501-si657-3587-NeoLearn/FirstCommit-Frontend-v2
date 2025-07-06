import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { CourseDetails } from '../../../core/models/course.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lesson-view',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.css']
})
export class LessonViewComponent implements OnInit {
  lessonDetails$!: Observable<CourseDetails>;
  courseId!: number;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.courseId) {
      this.lessonDetails$ = this.courseService.getCourseDetails(this.courseId);
    }
  }

  completeLesson(contentId: string): void {
    this.courseService.completeContent(this.courseId, contentId).subscribe(() => {
      this.snackBar.open(`Content '${contentId}' marked as complete!`, 'Close', { duration: 3000 });
    });
  }
}
