import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';

@Component({
  selector: 'app-resource-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './resource-form-dialog.component.html',
})
export class ResourceFormDialogComponent {
  resourceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ResourceFormDialogComponent>
  ) {
    this.resourceForm = this.fb.group({
      nombre: ['', Validators.required],
      url: ['', Validators.required],
      tipo: ['LINK', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.resourceForm.valid) {
      this.dialogRef.close(this.resourceForm.value);
    }
  }
}
