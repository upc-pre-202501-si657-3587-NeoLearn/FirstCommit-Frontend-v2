import { Injectable, inject, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, BehaviorSubject, switchMap, tap } from 'rxjs';
import { MembershipPlan } from '../models/membership.model';
import { UserProfile } from '../models/user.model';
import { environment } from '../../../environments/environments';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private http = inject(HttpClient);
  private injector = inject(Injector);

  private apiUrl = `${environment.apiUrl}`;
  private currentUserPlan$ = new BehaviorSubject<MembershipPlan | null>(null);

  getMembershipPlans(): Observable<MembershipPlan[]> {
    return this.http.get<MembershipPlan[]>(`${this.apiUrl}/plans`);
  }

  getCurrentUserPlan(): Observable<MembershipPlan | null> {
    return this.currentUserPlan$.asObservable();
  }

  fetchCurrentUserPlan(): void {
    const authService = this.injector.get(AuthService);
    const userId = authService.getCurrentUserId();
    if (!userId) {
      this.currentUserPlan$.next(null);
      return;
    }

    this.http.get<any>(`${this.apiUrl}/subscriptions/user/${userId}/active`).pipe(
      switchMap(subscription => {
        if (subscription && subscription.planId) {
          return this.http.get<MembershipPlan>(`${this.apiUrl}/plans/${subscription.planId}`);
        }
        return of(null);
      })
    ).subscribe(plan => {
      this.currentUserPlan$.next(plan);
    });
  }

  getProfileByUserId(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/profiles/user/${userId}`);
  }

  updateProfile(profileId: number, profileData: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/profiles/${profileId}`, profileData);
  }

  createProfile(profileData: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${this.apiUrl}/profiles`, profileData);
  }

  subscribeToPlan(plan: MembershipPlan): Observable<any> {
    const authService = this.injector.get(AuthService);
    const userId = authService.getCurrentUserId();
    if (!userId) return of({ success: false, message: 'User not logged in' });

    const subscription = {
      planId: plan.id,
      userId,
      status: 'ACTIVE'
    };
    return this.http.post(`${this.apiUrl}/subscriptions`, subscription).pipe(
      tap(() => this.currentUserPlan$.next(plan))
    );
  }
}
