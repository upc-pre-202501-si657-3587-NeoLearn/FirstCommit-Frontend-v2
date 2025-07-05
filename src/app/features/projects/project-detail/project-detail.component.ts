import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project, ProjectMember, Task } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskFormDialogComponent } from '../task-form-dialog/task-form-dialog.component';
import { InviteMemberDialogComponent } from '../invite-member-dialog/invite-member-dialog.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  public project: Project | null = null;
  public members: ProjectMember[] = [];
  public tasks: Task[] = [];
  public isLoading = true;
  public taskColumns: string[] = ['nombre', 'idUsuarioAsignado', 'fechaVencimiento', 'estado', 'actions'];
  public taskStatuses: string[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];
  private projectId!: number;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

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

    forkJoin({
      project: projectDetails$,
      members: members$,
      tasks: tasks$
    }).subscribe(result => {
      this.project = result.project;
      this.members = result.members;
      this.tasks = result.tasks;
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
      const operation$ = this.isEditMode(task)
        ? this.projectService.updateTask(task!.id, { ...task, ...result })
        : this.projectService.createTask({ ...result, idProyecto: this.projectId });

      operation$.subscribe(() => {
        const message = this.isEditMode(task) ? 'Task updated successfully!' : 'Task created successfully!';
        this.snackBar.open(message, 'Close', { duration: 3000 });
        this.loadProjectData();
      });
    });
  }

  isEditMode(task: Task | null): boolean {
    return !!task;
  }

  openInviteMemberDialog(): void {
    const dialogRef = this.dialog.open(InviteMemberDialogComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(userIdToInvite => {
      if (userIdToInvite) {
        this.projectService.inviteMember(this.projectId, userIdToInvite).subscribe({
          next: () => { this.snackBar.open('Invitation sent successfully!', 'Close', { duration: 3000 }); },
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
}
