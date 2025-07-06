import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { Course } from '../../../core/models/course.model';
import { CourseService } from '../../../core/services/course.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  private allCourses$ = new BehaviorSubject<Course[]>([]);
  public filteredCourses$!: Observable<Course[]>;
  public topics = ['All', 'Programming', 'Algorithms', 'Web Development', 'Databases', 'Mobile', 'Cloud'];
  public difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  public selectedTopic$ = new BehaviorSubject<string>('All');
  public selectedDifficulty$ = new BehaviorSubject<string>('All');
  public isAdmin = false; // <-- NUEVA PROPIEDAD

  constructor(
    private courseService: CourseService,
    private authService: AuthService // <-- INYECTAR AUTHSERVICE
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.hasRole('ROLE_ADMIN'); // <-- VERIFICAR ROL

    this.courseService.getCourses().subscribe(courses => {
      this.allCourses$.next(courses);
    });
    this.filteredCourses$ = combineLatest([this.allCourses$, this.selectedTopic$, this.selectedDifficulty$]).pipe(
      map(([courses, topic, difficulty]) => {
        return courses.filter((course: Course) => {
          const topicMatch = topic === 'All' || course.category === topic;
          const difficultyMatch = difficulty === 'All' || course.difficulty === difficulty;
          return topicMatch && difficultyMatch;
        });
      })
    );
  }

  onTopicChange(topic: string): void { this.selectedTopic$.next(topic); }
  onDifficultyChange(difficulty: string): void { this.selectedDifficulty$.next(difficulty); }
}
