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
    return this.http.patch<Project>(`${this.apiUrl}/projects/${id}`, data);
  }

  getProjectMembers(projectId: number): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`${this.apiUrl}/members?projectId=${projectId}`);
  }

  removeMember(memberId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/members/${memberId}`);
  }

  getProjectTasks(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks?projectId=${projectId}`);
  }

  createTask(taskData: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, taskData);
  }

  updateTask(taskId: number, taskData: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/tasks/${taskId}`, taskData);
  }

  inviteMember(projectId: number, userId: number, inviterId: number): Observable<Invitation> {
    const body: Partial<Invitation> = {
      projectId,
      idUsuarioInvitado: userId,
      idUsuarioInvitador: inviterId,
      estado: 'PENDING',
      fechaEnvio: new Date().toISOString()
    };
    return this.http.post<Invitation>(`${this.apiUrl}/invitations`, body);
  }

  getUserInvitations(userId: number): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(`${this.apiUrl}/invitations?idUsuarioInvitado=${userId}`);
  }

  respondToInvitation(invitationId: number, response: 'ACCEPTED' | 'REJECTED'): Observable<Invitation> {
    return this.http.patch<Invitation>(`${this.apiUrl}/invitations/${invitationId}`, { estado: response });
  }

  getProjectMessages(projectId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages?projectId=${projectId}`);
  }

  sendMessage(message: Partial<Message>): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/messages`, message);
  }

  getProjectRequirements(projectId: number): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(`${this.apiUrl}/requirements?projectId=${projectId}`);
  }

  addRequirement(requirement: Partial<Requirement>): Observable<Requirement> {
    return this.http.post<Requirement>(`${this.apiUrl}/requirements`, requirement);
  }

  getProjectTechnologies(projectId: number): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${this.apiUrl}/technologies?projectId=${projectId}`);
  }

  getProjectResources(projectId: number): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/resources?projectId=${projectId}`);
  }

  addResource(resource: Partial<Resource>): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}/resources`, resource);
  }
}
