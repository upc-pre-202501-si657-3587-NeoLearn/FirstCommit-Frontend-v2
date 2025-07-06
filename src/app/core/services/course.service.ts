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
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCourses(forAdmin: boolean = false): Observable<Course[]> {
    const url = forAdmin ? `${this.apiUrl}/admins/courses` : `${this.apiUrl}/courses`;
    return this.http.get<Course[]>(url);
  }

  getEnrolledCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/users/courses/enrolled`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  getCourseDetails(id: number): Observable<CourseDetails> {
    return this.http.get<CourseDetails>(`${this.apiUrl}/courses/${id}`);
  }

  createCourse(course: any): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/admins/courses`, course);
  }

  enrollInCourse(courseId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/courses/${courseId}/enroll`, {});
  }

  rateCourse(courseId: number, rating: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/courses/${courseId}/rating`, { rating });
  }

  publishCourse(courseId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/admins/courses/${courseId}/publish`, {});
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admins/courses/${courseId}`);
  }

  completeContent(courseId: number, contentId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/courses/${courseId}/content/${contentId}/complete`, {});
  }
}
