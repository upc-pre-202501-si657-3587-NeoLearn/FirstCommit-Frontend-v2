import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatRadioModule
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {
  projectForm: FormGroup;
  projectTypes: string[] = ['GROUP', 'OPEN_SOURCE'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProjectFormComponent>
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      projectType: ['GROUP', Validators.required],
      license: ['']
    });

    this.projectForm.get('projectType')?.valueChanges.subscribe(value => {
      const licenseControl = this.projectForm.get('license');
      if (value === 'OPEN_SOURCE') {
        licenseControl?.setValidators([Validators.required]);
      } else {
        licenseControl?.clearValidators();
        licenseControl?.setValue('');
      }
      licenseControl?.updateValueAndValidity();
    });
  }

  onCancel(): void { this.dialogRef.close(); }
  onSubmit(): void { if (this.projectForm.valid) this.dialogRef.close(this.projectForm.value); }
}
