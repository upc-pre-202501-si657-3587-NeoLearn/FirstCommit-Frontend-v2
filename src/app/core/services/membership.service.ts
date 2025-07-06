import { Injectable, inject, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import { MembershipPlan } from '../models/membership.model';
import { UserProfile } from '../models/user.model';
import { environment } from '../../../environments/environments';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private http = inject(HttpClient);
  private injector = inject(Injector); // Usamos Injector para romper el ciclo

  private plansUrl = `${environment.apiUrl}/memberships`;
  private profilesUrl = `${environment.apiUrl}/profiles`;
  private subscriptionsUrl = `${environment.apiUrl}/subscriptions`;

  getMembershipPlans(): Observable<MembershipPlan[]> {
    return this.http.get<MembershipPlan[]>(this.plansUrl);
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

  subscribeToPlan(planId: number): Observable<any> {
    const authService = this.injector.get(AuthService); // Obtención tardía
    const userId = authService.getCurrentUserId();
    if (!userId) return of({ success: false, message: 'User not logged in' });

    const subscription = {
      planId,
      userId,
      status: 'ACTIVE',
      startDate: new Date().toISOString()
    };
    return this.http.post(this.subscriptionsUrl, subscription);
  }
}
