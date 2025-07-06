import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { MembershipPlan } from '../../../core/models/membership.model';
import { MembershipService } from '../../../core/services/membership.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-membership-plans',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './membership-plans.component.html',
  styleUrls: ['./membership-plans.component.css']
})
export class MembershipPlansComponent implements OnInit {
  plans$!: Observable<MembershipPlan[]>;
  currentUserPlan$!: Observable<MembershipPlan | null>;

  constructor(
    private membershipService: MembershipService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.plans$ = this.membershipService.getMembershipPlans();
    this.currentUserPlan$ = this.membershipService.getCurrentUserPlan();
    this.membershipService.fetchCurrentUserPlan(); // Cargar el plan actual al iniciar
  }

  subscribe(plan: MembershipPlan): void {
    this.membershipService.subscribeToPlan(plan).subscribe({
      next: () => {
        this.snackBar.open(`Suscripción a ${plan.name} exitosa!`, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: (err) => {
        this.snackBar.open('Error en la suscripción.', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
