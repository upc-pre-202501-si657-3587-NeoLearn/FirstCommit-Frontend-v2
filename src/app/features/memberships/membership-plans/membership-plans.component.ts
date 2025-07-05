import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { MembershipPlan } from '../../../core/models/membership.model';
import { MembershipService } from '../../../core/services/membership.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'; // <-- AÑADIDO

@Component({
  selector: 'app-membership-plans',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './membership-plans.component.html',
  styleUrls: ['./membership-plans.component.css']
})
export class MembershipPlansComponent implements OnInit {
  plans$!: Observable<MembershipPlan[]>;

  constructor(
    private membershipService: MembershipService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.plans$ = this.membershipService.getMembershipPlans();
  }

  subscribe(planName: string): void {
    this.snackBar.open(`¡Te has suscrito al ${planName} con éxito!`, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
