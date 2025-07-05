import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { ProjectMember, Task } from '../../../core/models/project.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-task-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, MatDatepickerModule, MatNativeDateModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.css']
})
export class TaskFormDialogComponent implements OnInit {
  public taskForm: FormGroup;
  public members: ProjectMember[];
  public isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { members: ProjectMember[], task?: Task }
  ) {
    this.members = data.members;
    this.isEditMode = !!data.task; // Si hay 'task' en los datos, estamos en modo edición

    this.taskForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      idUsuarioAsignado: [null, Validators.required],
      fechaVencimiento: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.task) {
      // Si estamos en modo edición, rellenamos el formulario con los datos de la tarea
      this.taskForm.patchValue(this.data.task);
    }
  }

  onCancel(): void { this.dialogRef.close(); }
  onSave(): void { if (this.taskForm.valid) { this.dialogRef.close(this.taskForm.value); } }
}
