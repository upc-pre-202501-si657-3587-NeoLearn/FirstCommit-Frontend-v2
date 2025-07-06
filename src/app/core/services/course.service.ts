import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Course, CourseDetails } from '../models/course.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  getCourseDetails(id: number): Observable<CourseDetails> {
    return this.http.get<CourseDetails>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    const newCourse = { ...course, id: Date.now() };
    return this.http.post<Course>(this.apiUrl, newCourse);
  }

  completeContent(courseId: number, contentId: string): Observable<any> {
    console.log(`Simulating completion for course ${courseId}, content ${contentId}`);
    return of({ success: true });
  }
}
