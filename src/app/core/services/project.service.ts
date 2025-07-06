import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProjectMember, Task, Invitation, Message, Requirement, Technology, Resource } from '../models/project.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${id}`);
  }

  updateProject(id: number, data: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/projects/${id}`, data);
  }

  getProjectMembers(projectId: number): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`${this.apiUrl}/projects/${projectId}/members`);
  }

  removeMember(projectId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/projects/${projectId}/members/${userId}`);
  }

  getProjectTasks(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/projects/${projectId}/tasks`);
  }

  createTask(projectId: number, taskData: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/projects/${projectId}/tasks`, taskData);
  }

  updateTask(taskId: number, taskData: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${taskId}`, taskData);
  }

  inviteMember(projectId: number, userId: number): Observable<Invitation> {
    return this.http.post<Invitation>(`${this.apiUrl}/projects/${projectId}/invitations`, { idUsuarioInvitado: userId });
  }

  getUserInvitations(userId: number): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(`${this.apiUrl}/users/${userId}/invitations`);
  }

  respondToInvitation(invitationId: number, response: 'ACCEPTED' | 'REJECTED'): Observable<Invitation> {
    return this.http.put<Invitation>(`${this.apiUrl}/invitations/${invitationId}/respond`, { respuesta: response });
  }

  getProjectMessages(projectId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/projects/${projectId}/messages`);
  }

  sendMessage(projectId: number, content: string): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/projects/${projectId}/messages`, { contenido: content });
  }

  getProjectRequirements(projectId: number): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(`${this.apiUrl}/projects/${projectId}/requirements`);
  }

  getProjectTechnologies(projectId: number): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${this.apiUrl}/projects/${projectId}/technologies`);
  }

  getProjectResources(projectId: number): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/projects/${projectId}/resources`);
  }

  addResource(projectId: number, resource: any): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}/projects/${projectId}/resources`, resource);
  }
}
