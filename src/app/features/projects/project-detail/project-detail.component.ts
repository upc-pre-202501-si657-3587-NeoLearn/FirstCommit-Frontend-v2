import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project, ProjectMember, Task, Message, Requirement, Technology } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { TaskFormDialogComponent } from '../task-form-dialog/task-form-dialog.component';
import { InviteMemberDialogComponent } from '../invite-member-dialog/invite-member-dialog.component';
import {MatChip, MatChipListbox} from '@angular/material/chips';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule, MatChipListbox, MatChip],
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
  public isLoading = true;

  public taskColumns: string[] = ['nombre', 'idUsuarioAsignado', 'fechaVencimiento', 'estado', 'actions'];
  public taskStatuses: string[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];

  public messageForm: FormGroup;
  public requirementForm: FormGroup;
  public technologyForm: FormGroup;

  private projectId!: number;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.messageForm = this.fb.group({ content: ['', Validators.required] });
    this.requirementForm = this.fb.group({ descripcion: ['', Validators.required], tipo: ['FUNCIONAL', Validators.required] });
    this.technologyForm = this.fb.group({ nombre: ['', Validators.required] });
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

    forkJoin({
      project: projectDetails$,
      members: members$,
      tasks: tasks$,
      messages: messages$,
      requirements: requirements$,
      technologies: technologies$
    }).subscribe(result => {
      this.project = result.project;
      this.members = result.members;
      this.tasks = result.tasks;
      this.messages = result.messages;
      this.requirements = result.requirements;
      this.technologies = result.technologies;
      this.isLoading = false;
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
        ? this.projectService.updateTask(task!.id, result)
        : this.projectService.createTask({ ...result, projectId: this.projectId });

      operation$.subscribe(() => {
        const message = task ? 'Task updated successfully!' : 'Task created successfully!';
        this.snackBar.open(message, 'Close', { duration: 3000 });
        this.loadProjectData();
      });
    });
  }

  openInviteMemberDialog(): void {
    const dialogRef = this.dialog.open(InviteMemberDialogComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(userIdToInvite => {
      if (userIdToInvite) {
        this.projectService.inviteMember(this.projectId, userIdToInvite).subscribe({
          next: () => {
            this.snackBar.open('Invitation sent successfully!', 'Close', { duration: 3000 });
          },
          error: (err) => { this.snackBar.open(`Error: ${err.message}`, 'Close', { duration: 5000 }); }
        });
      }
    });
  }

  onStatusChange(task: Task, newStatus: string): void {
    if (task.estado === newStatus) return;
    this.projectService.updateTaskStatus(task, newStatus).subscribe({
      next: () => {
        this.snackBar.open(`Task status updated to ${newStatus.replace('_', ' ')}`, 'Close', { duration: 3000 });
        this.loadProjectData();
      },
      error: () => {
        this.snackBar.open('Failed to update task status.', 'Close', { duration: 3000 });
        this.loadProjectData();
      }
    });
  }

  onSendMessage(): void {
    if (this.messageForm.invalid) return;
    const content = this.messageForm.value.content;
    const userId = this.authService.getCurrentUserId() ?? 0;
    const username = this.authService.getCurrentUsername() ?? "User";

    this.projectService.sendMessage(this.projectId, content, userId, username).subscribe(() => {
      this.messageForm.reset();
      this.loadProjectData();
    });
  }

  onAddRequirement(): void {
    if (this.requirementForm.invalid) return;
    this.projectService.addRequirement(this.projectId, this.requirementForm.value).subscribe(() => {
      this.requirementForm.reset({ tipo: 'FUNCIONAL' });
      this.loadProjectData();
    });
  }

  onAddTechnology(): void {
    if (this.technologyForm.invalid) return;
    this.projectService.addTechnology(this.projectId, this.technologyForm.value).subscribe(() => {
      this.technologyForm.reset();
      this.loadProjectData();
    });
  }
}
