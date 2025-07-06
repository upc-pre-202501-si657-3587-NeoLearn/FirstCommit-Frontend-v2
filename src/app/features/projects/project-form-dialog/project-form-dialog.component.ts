import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './project-form-dialog.component.html',
})
export class ProjectFormDialogComponent {
  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProjectFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project }
  ) {
    this.projectForm = this.fb.group({
      nombre: [data.project.nombre, Validators.required],
      descripcionGeneral: [data.project.descripcionGeneral, Validators.required],
      urlRepositorio: [data.project.urlRepositorio, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.projectForm.valid) {
      this.dialogRef.close(this.projectForm.value);
    }
  }
}
