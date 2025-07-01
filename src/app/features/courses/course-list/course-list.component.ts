import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { Course } from '../../../core/models/course.model';
import { CourseService } from '../../../core/services/course.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  private allCourses$ = new BehaviorSubject<Course[]>([]);
  filteredCourses$!: Observable<Course[]>;

  topics = ['All', 'Programming', 'Algorithms', 'Web Development', 'Databases', 'Mobile', 'Cloud'];
  difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // --- INICIO DE LA CORRECCIÓN ---
  // Se quita 'private' para que las propiedades sean públicas y accesibles desde el HTML.
  selectedTopic$ = new BehaviorSubject<string>('All');
  selectedDifficulty$ = new BehaviorSubject<string>('All');
  // --- FIN DE LA CORRECCIÓN ---

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.allCourses$.next(courses);
    });

    this.filteredCourses$ = combineLatest([
      this.allCourses$,
      this.selectedTopic$,
      this.selectedDifficulty$
    ]).pipe(
      map(([courses, topic, difficulty]) => {
        return courses.filter((course: Course) => {
          const topicMatch = topic === 'All' || course.category === topic;
          const difficultyMatch = difficulty === 'All' || course.difficulty === difficulty;
          return topicMatch && difficultyMatch;
        });
      })
    );
  }

  onTopicChange(topic: string): void {
    this.selectedTopic$.next(topic);
  }

  onDifficultyChange(difficulty: string): void {
    this.selectedDifficulty$.next(difficulty);
  }
}
