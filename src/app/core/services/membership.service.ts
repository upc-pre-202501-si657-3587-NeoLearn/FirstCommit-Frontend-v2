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

  private plansUrl = `${environment.apiUrl}/memberships`;
  private profilesUrl = `${environment.apiUrl}/profiles`;
  private subscriptionsUrl = `${environment.apiUrl}/subscriptions`;

  private currentUserPlan$ = new BehaviorSubject<MembershipPlan | null>(null);

  getMembershipPlans(): Observable<MembershipPlan[]> {
    return this.http.get<MembershipPlan[]>(this.plansUrl);
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

    // Simulación: Buscamos la última suscripción del usuario
    this.http.get<any[]>(`${this.subscriptionsUrl}?userId=${userId}&_sort=id&_order=desc&_limit=1`).pipe(
      switchMap(subscriptions => {
        if (subscriptions.length > 0) {
          const planId = subscriptions[0].planId;
          return this.http.get<MembershipPlan>(`${this.plansUrl}/${planId}`);
        }
        return of(null);
      })
    ).subscribe(plan => {
      this.currentUserPlan$.next(plan);
    });
  }

  getProfileByUserId(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile[]>(`${this.profilesUrl}?userId=${userId}`).pipe(
      map(profiles => profiles[0])
    );
  }

  updateProfile(profileId: number, profileData: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.patch<UserProfile>(`${this.profilesUrl}/${profileId}`, profileData);
  }

  createProfile(profileData: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.post<UserProfile>(this.profilesUrl, profileData);
  }

  subscribeToPlan(plan: MembershipPlan): Observable<any> {
    const authService = this.injector.get(AuthService);
    const userId = authService.getCurrentUserId();
    if (!userId) return of({ success: false, message: 'User not logged in' });

    const subscription = {
      planId: plan.id,
      userId,
      status: 'ACTIVE',
      startDate: new Date().toISOString()
    };
    return this.http.post(this.subscriptionsUrl, subscription).pipe(
      tap(() => this.currentUserPlan$.next(plan))
    );
  }
}
