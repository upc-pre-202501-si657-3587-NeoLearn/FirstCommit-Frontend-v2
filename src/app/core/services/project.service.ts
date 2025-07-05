import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProjectMember, Task, Invitation } from '../models/project.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> { return this.http.get<Project[]>(`${this.apiUrl}/projects`); }
  getProjectById(id: number): Observable<Project> { return this.http.get<Project>(`${this.apiUrl}/projects/${id}`); }
  getProjectMembers(projectId: number): Observable<ProjectMember[]> { return this.http.get<ProjectMember[]>(`${this.apiUrl}/members?idProyecto=${projectId}`); }
  getProjectTasks(projectId: number): Observable<Task[]> { return this.http.get<Task[]>(`${this.apiUrl}/tasks?idProyecto=${projectId}`); }
  createTask(taskData: Partial<Task>): Observable<Task> { return this.http.post<Task>(`${this.apiUrl}/tasks`, taskData); }
  updateTask(taskId: number, taskData: Partial<Task>): Observable<Task> { return this.http.put<Task>(`${this.apiUrl}/tasks/${taskId}`, taskData); }

  updateTaskStatus(task: Task, newStatus: string): Observable<Task> {
    const updatedTask = { ...task, estado: newStatus };
    return this.http.put<Task>(`${this.apiUrl}/tasks/${task.id}`, updatedTask);
  }

  inviteMember(projectId: number, userId: number): Observable<Invitation> {
    const body = { idProyecto: projectId, idUsuarioInvitado: userId, idUsuarioInvitador: 1, estado: 'PENDING', fechaEnvio: new Date().toISOString() };
    return this.http.post<Invitation>(`${this.apiUrl}/invitations`, body);
  }
  getUserInvitations(userId: number): Observable<Invitation[]> { return this.http.get<Invitation[]>(`${this.apiUrl}/invitations?idUsuarioInvitado=${userId}`); }
  respondToInvitation(invitation: Invitation, response: 'ACCEPTED' | 'REJECTED'): Observable<Invitation> {
    const updatedInvitation = { ...invitation, estado: response };
    return this.http.put<Invitation>(`${this.apiUrl}/invitations/${invitation.id}`, updatedInvitation);
  }
}
