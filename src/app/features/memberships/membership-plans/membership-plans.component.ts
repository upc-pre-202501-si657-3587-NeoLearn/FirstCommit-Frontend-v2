import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { MembershipPlan } from '../../../core/models/membership.model';
import { MembershipService } from '../../../core/services/membership.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-membership-plans',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './membership-plans.component.html',
  styleUrls: ['./membership-plans.component.css']
})
export class MembershipPlansComponent implements OnInit {
  plans$!: Observable<MembershipPlan[]>;

  constructor(private membershipService: MembershipService) {}

  ngOnInit(): void {
    this.plans$ = this.membershipService.getMembershipPlans();
  }
}
