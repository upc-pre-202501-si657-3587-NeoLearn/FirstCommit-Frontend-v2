import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, startWith } from 'rxjs/operators';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import {MatList, MatListItem} from '@angular/material/list';

@Component({
  selector: 'app-invite-member-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, MatProgressSpinnerModule, MatList, MatListItem, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './invite-member-dialog.component.html',
  styleUrls: ['./invite-member-dialog.component.css']
})
export class InviteMemberDialogComponent {
  public searchForm: FormGroup;
  public searchResults$!: Observable<User[]>;
  public isLoading = false;
  public selectedUser: User | null = null;
  private searchTerms = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InviteMemberDialogComponent>,
    private userService: UserService
  ) {
    this.searchForm = this.fb.group({
      username: ['']
    });

    this.searchResults$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (!term.trim()) {
          return of([]);
        }
        this.isLoading = true;
        return this.userService.searchUserByUsername(term).pipe(
          // La API devuelve un solo usuario, lo convertimos a un array
          switchMap(user => of([user])),
          catchError(() => {
            this.isLoading = false;
            return of([]); // En caso de error (ej. 404), devuelve un array vacío
          })
        );
      })
    );

    this.searchResults$.subscribe(() => this.isLoading = false);
  }

  search(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerms.next(term);
  }

  selectUser(user: User): void {
    this.selectedUser = user;
    this.searchForm.get('username')?.setValue(user.nombreUsuario);
    this.searchTerms.next(''); // Limpia los resultados
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onInvite(): void {
    if (this.selectedUser) {
      this.dialogRef.close(this.selectedUser.id);
    }
  }
}
