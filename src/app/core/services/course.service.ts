import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Course, CourseDetails } from '../models/course.model';
import { environment } from '../../../environments/environments';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCourses(forAdmin: boolean = false): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  getCourseDetails(id: number): Observable<CourseDetails> {
    return this.http.get<CourseDetails>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Omit<Course, 'id' | 'published' | 'averageRating' | 'instructorId'>): Observable<Course> {
    const newCourse: Omit<Course, 'id'> = {
      ...course,
      instructorId: this.authService.getCurrentUserId()?.toString() || 'admin',
      published: false,
      averageRating: 0,
      reviews: 0,
      views: 0
    };
    return this.http.post<Course>(this.apiUrl, newCourse);
  }

  enrollInCourse(courseId: number): Observable<any> {
    console.log(`Simulating enrollment for course ${courseId} for user ${this.authService.getCurrentUserId()}`);
    return of({ success: true });
  }

  rateCourse(courseId: number, rating: number): Observable<Course> {
    return this.http.patch<Course>(`${this.apiUrl}/${courseId}`, { averageRating: rating });
  }

  publishCourse(courseId: number): Observable<Course> {
    return this.http.patch<Course>(`${this.apiUrl}/${courseId}`, { published: true });
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}`);
  }

  completeContent(courseId: number, contentId: string): Observable<any> {
    console.log(`Simulating completion for course ${courseId}, content ${contentId}`);
    return of({ success: true });
  }
}
