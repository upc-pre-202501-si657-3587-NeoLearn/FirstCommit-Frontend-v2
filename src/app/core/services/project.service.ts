import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProjectMember, Task, Invitation, Message, Requirement, Technology } from '../models/project.model';
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

  getProjectMembers(projectId: number): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`${this.apiUrl}/members?projectId=${projectId}`);
  }

  getProjectTasks(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks?projectId=${projectId}`);
  }

  createTask(taskData: Partial<Task>): Observable<Task> {
    const fullTask = { ...taskData, id: Date.now(), fechaCreacion: new Date().toISOString() };
    return this.http.post<Task>(`${this.apiUrl}/tasks`, fullTask);
  }

  updateTask(taskId: number, taskData: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/tasks/${taskId}`, taskData);
  }

  updateTaskStatus(task: Task, newStatus: string): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/tasks/${task.id}`, { estado: newStatus });
  }

  inviteMember(projectId: number, userId: number): Observable<Invitation> {
    const body = { id: Date.now(), projectId, idUsuarioInvitado: userId, idUsuarioInvitador: 1, estado: 'PENDING', fechaEnvio: new Date().toISOString() };
    return this.http.post<Invitation>(`${this.apiUrl}/invitations`, body);
  }

  getUserInvitations(userId: number): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(`${this.apiUrl}/invitations?idUsuarioInvitado=${userId}`);
  }

  respondToInvitation(invitation: Invitation, response: 'ACCEPTED' | 'REJECTED'): Observable<Invitation> {
    const updatedInvitation = { ...invitation, estado: response };
    return this.http.put<Invitation>(`${this.apiUrl}/invitations/${invitation.id}`, updatedInvitation);
  }

  getProjectMessages(projectId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages?projectId=${projectId}`);
  }

  sendMessage(projectId: number, content: string, userId: number, username: string): Observable<Message> {
    const newMessage = { id: Date.now(), projectId, userId, username, content, timestamp: new Date().toISOString() };
    return this.http.post<Message>(`${this.apiUrl}/messages`, newMessage);
  }

  getProjectRequirements(projectId: number): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(`${this.apiUrl}/requirements?projectId=${projectId}`);
  }

  addRequirement(projectId: number, requirement: { descripcion: string, tipo: string }): Observable<Requirement> {
    const newRequirement = { ...requirement, id: Date.now(), projectId };
    return this.http.post<Requirement>(`${this.apiUrl}/requirements`, newRequirement);
  }

  getProjectTechnologies(projectId: number): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${this.apiUrl}/technologies?projectId=${projectId}`);
  }

  addTechnology(projectId: number, technology: { nombre: string }): Observable<Technology> {
    const newTechnology = { ...technology, id: Date.now(), projectId };
    return this.http.post<Technology>(`${this.apiUrl}/technologies`, newTechnology);
  }
}
