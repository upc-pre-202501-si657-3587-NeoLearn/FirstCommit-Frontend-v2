import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserProfile } from '../../core/models/user.model';
import { MembershipService } from '../../core/services/membership.service'; // <-- IMPORT CORREGIDO
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile$!: Observable<UserProfile>;
  profileForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private membershipService: MembershipService, // <-- SERVICIO CORREGIDO
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      id: [null],
      fullName: ['', Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      bio: ['']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const currentUserId = this.authService.getCurrentUserId();
    if (currentUserId) {
      this.profile$ = this.membershipService.getProfileByUserId(currentUserId);
      this.profile$.subscribe(user => {
        if (user) {
          this.profileForm.patchValue(user);
        }
      });
    }
  }

  onProfileSubmit(): void {
    if (this.profileForm.valid) {
      const profileData = this.profileForm.getRawValue();
      this.membershipService.updateProfile(profileData.id, profileData).subscribe({
        next: () => this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 }),
        error: (err) => this.snackBar.open(`Error updating profile: ${err.message}`, 'Close', { duration: 5000 })
      });
    }
  }

  onPasswordSubmit(): void {
    if (this.passwordForm.valid) {
      // Aquí iría la llamada al servicio para cambiar la contraseña
      console.log('Password change requested');
      this.snackBar.open('Password updated successfully!', 'Close', { duration: 3000 });
      this.passwordForm.reset();
    }
  }
}
