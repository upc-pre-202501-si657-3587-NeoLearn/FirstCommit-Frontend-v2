import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserProfile } from '../../core/models/user.model';
import { ProfileService } from '../../core/services/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // <-- AÑADIDO

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
    private profileService: ProfileService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar // <-- AÑADIDO
  ) {
    this.profileForm = this.fb.group({
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
    this.profile$ = this.profileService.getProfile();
    this.profile$.subscribe(user => {
      this.profileForm.patchValue(user);
    });
  }

  onProfileSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Profile updated:', this.profileForm.getRawValue());
      this.snackBar.open('Perfil actualizado correctamente.', 'Cerrar', { duration: 3000 });
    }
  }

  onPasswordSubmit(): void {
    if (this.passwordForm.valid) {
      console.log('Password change requested');
      this.snackBar.open('Contraseña actualizada correctamente.', 'Cerrar', { duration: 3000 });
      this.passwordForm.reset();
    }
  }
}
