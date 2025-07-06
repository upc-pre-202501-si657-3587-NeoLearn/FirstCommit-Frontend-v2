import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { MembershipService } from '../../../core/services/membership.service';
import { MembershipPlan } from '../../../core/models/membership.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-plan-management',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './plan-management.component.html',
  styleUrls: ['./plan-management.component.css']
})
export class PlanManagementComponent implements OnInit {
  plans$: Observable<MembershipPlan[]>;

  constructor(
    private membershipService: MembershipService,
    private snackBar: MatSnackBar
  ) {
    this.plans$ = this.membershipService.getMembershipPlans();
  }

  ngOnInit(): void {}

  addBenefit(plan: MembershipPlan): void {
    const benefitName = prompt(`Enter new benefit for ${plan.name}:`);
    if (benefitName) {
      this.snackBar.open(`Benefit "${benefitName}" added to ${plan.name}.`, 'Close', { duration: 3000 });
      console.log(`Simulating adding benefit to plan ${plan.id}`);
    }
  }

  removeBenefit(plan: MembershipPlan, feature: string): void {
    if (confirm(`Remove "${feature}" from ${plan.name}?`)) {
      this.snackBar.open(`Benefit "${feature}" removed from ${plan.name}.`, 'Close', { duration: 3000 });
      console.log(`Simulating removing benefit from plan ${plan.id}`);
    }
  }
}
