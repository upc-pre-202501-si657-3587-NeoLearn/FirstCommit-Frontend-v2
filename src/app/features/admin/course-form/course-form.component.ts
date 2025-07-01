import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { Course } from '../../../core/models/course.model';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  topics = ['Programming', 'Algorithms', 'Web Development', 'Databases', 'Mobile', 'Cloud'];
  difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      difficulty: ['', Validators.required],
      duration: ['', Validators.required],
      imageUrl: ['', Validators.required],
      rating: [0],
      reviews: [0]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.courseForm.valid) {
      const newCourse: Course = this.courseForm.value;
      this.courseService.createCourse(newCourse).subscribe({
        next: () => {
          console.log('Course created successfully!');
          this.router.navigate(['/courses']);
        },
        error: (err) => {
          console.error('Error creating course:', err);
        }
      });
    }
  }
}
