import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project, ProjectMember, Task, Message, Requirement, Technology, Resource } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { TaskFormDialogComponent } from '../task-form-dialog/task-form-dialog.component';
import { InviteMemberDialogComponent } from '../invite-member-dialog/invite-member-dialog.component';
import { ProjectFormDialogComponent } from '../project-form-dialog/project-form-dialog.component';
import { ResourceFormDialogComponent } from '../resource-form-dialog/resource-form-dialog.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  public project: Project | null = null;
  public members: ProjectMember[] = [];
  public tasks: Task[] = [];
  public messages: Message[] = [];
  public requirements: Requirement[] = [];
  public technologies: Technology[] = [];
  public resources: Resource[] = [];
  public isLoading = true;

  public taskColumns: string[] = ['nombre', 'idUsuarioAsignado', 'fechaVencimiento', 'estado', 'actions'];
  public taskStatuses: string[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

  public messageForm: FormGroup;

  private projectId!: number;
  private currentUserId: number | null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.messageForm = this.fb.group({ content: ['', Validators.required] });
    this.currentUserId = this.authService.getCurrentUserId();
  }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.projectId) {
      this.loadProjectData();
    }
  }

  loadProjectData(): void {
    this.isLoading = true;
    const projectDetails$ = this.projectService.getProjectById(this.projectId).pipe(catchError(() => of(null)));
    const members$ = this.projectService.getProjectMembers(this.projectId).pipe(catchError(() => of([])));
    const tasks$ = this.projectService.getProjectTasks(this.projectId).pipe(catchError(() => of([])));
    const messages$ = this.projectService.getProjectMessages(this.projectId).pipe(catchError(() => of([])));
    const requirements$ = this.projectService.getProjectRequirements(this.projectId).pipe(catchError(() => of([])));
    const technologies$ = this.projectService.getProjectTechnologies(this.projectId).pipe(catchError(() => of([])));
    const resources$ = this.projectService.getProjectResources(this.projectId).pipe(catchError(() => of([])));

    forkJoin({
      project: projectDetails$,
      members: members$,
      tasks: tasks$,
      messages: messages$,
      requirements: requirements$,
      technologies: technologies$,
      resources: resources$
    }).subscribe(result => {
      this.project = result.project;
      this.members = result.members;
      this.tasks = result.tasks;
      this.messages = result.messages;
      this.requirements = result.requirements;
      this.technologies = result.technologies;
      this.resources = result.resources;
      this.isLoading = false;
    });
  }

  openEditProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectFormDialogComponent, {
      width: '600px',
      data: { project: this.project }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.project) {
        this.projectService.updateProject(this.project.id, result).subscribe(() => {
          this.snackBar.open('Project updated successfully!', 'Close', { duration: 3000 });
          this.loadProjectData();
        });
      }
    });
  }

  openTaskDialog(task: Task | null): void {
    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      width: '500px',
      data: { members: this.members, task: task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      const operation$ = task
        ? this.projectService.updateTask(task.id, result)
        : this.projectService.createTask(this.projectId, { ...result, estado: 'PENDING' });

      operation$.subscribe(() => {
        this.snackBar.open(task ? 'Task updated!' : 'Task created!', 'Close', { duration: 3000 });
        this.loadProjectData();
      });
    });
  }

  openInviteMemberDialog(): void {
    const dialogRef = this.dialog.open(InviteMemberDialogComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(userIdToInvite => {
      if (userIdToInvite) {
        this.projectService.inviteMember(this.projectId, userIdToInvite).subscribe({
          next: () => this.snackBar.open('Invitation sent!', 'Close', { duration: 3000 }),
          error: (err) => this.snackBar.open(`Error: ${err.message}`, 'Close', { duration: 5000 })
        });
      }
    });
  }

  removeMember(member: ProjectMember): void {
    if (confirm(`Are you sure you want to remove user ${member.userId}?`)) {
      this.projectService.removeMember(this.projectId, member.userId).subscribe(() => {
        this.snackBar.open('Member removed.', 'Close', { duration: 3000 });
        this.loadProjectData();
      });
    }
  }

  onSendMessage(): void {
    if (this.messageForm.invalid) return;
    const content = this.messageForm.value.content;
    this.projectService.sendMessage(this.projectId, content).subscribe(() => {
      this.messageForm.reset();
      this.loadProjectData();
    });
  }

  openResourceDialog(): void {
    const dialogRef = this.dialog.open(ResourceFormDialogComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.addResource(this.projectId, result).subscribe(() => {
          this.snackBar.open('Resource added!', 'Close', { duration: 3000 });
          this.loadProjectData();
        });
      }
    });
  }
}
