import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectService } from '../../core/services/project.service';
import { Invitation } from '../../core/models/project.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-invitations',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatProgressSpinnerModule],
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {
  public invitations$!: Observable<Invitation[]>;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadInvitations();
  }

  loadInvitations(): void {
    const currentUserId = this.authService.getCurrentUserId();
    if (currentUserId) {
      this.invitations$ = this.projectService.getUserInvitations(currentUserId).pipe(
        catchError(() => of([]))
      );
    }
  }

  respond(invitation: Invitation, response: 'ACCEPTED' | 'REJECTED'): void {
    this.projectService.respondToInvitation(invitation, response).subscribe({
      next: () => {
        this.snackBar.open(`Invitation ${response.toLowerCase()}!`, 'Close', { duration: 3000 });
        this.loadInvitations();
      },
      error: (err) => {
        this.snackBar.open(`Error: ${err.message}`, 'Close', { duration: 5000 });
      }
    });
  }
}
