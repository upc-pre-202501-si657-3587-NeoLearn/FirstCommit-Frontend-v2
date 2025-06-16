import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiBaseUrl}/projects`;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProjectById(id: string): Observable<Project> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Project>(url);
  }

  createProject(projectData: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, projectData);
  }
}
