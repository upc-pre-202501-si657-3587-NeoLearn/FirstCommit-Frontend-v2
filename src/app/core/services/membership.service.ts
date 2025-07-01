import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MembershipPlan } from '../models/membership.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private apiUrl = `${environment.apiUrl}/memberships`;

  constructor(private http: HttpClient) { }

  getMembershipPlans(): Observable<MembershipPlan[]> {
    return this.http.get<MembershipPlan[]>(this.apiUrl);
  }
}
