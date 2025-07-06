import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MembershipPlan } from '../models/membership.model';
import { UserProfile } from '../models/user.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private plansUrl = `${environment.apiUrl}/plans`;
  private profilesUrl = `${environment.apiUrl}/profiles`;

  constructor(private http: HttpClient) { }

  // --- Plans ---
  getMembershipPlans(): Observable<MembershipPlan[]> {
    // NOTA: El backend devuelve un PlanResource, que puede ser diferente.
    // Si es necesario, aquí se haría un `map()` para transformar los datos.
    return this.http.get<MembershipPlan[]>(this.plansUrl);
  }

  // --- Profiles ---
  getProfileByUserId(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.profilesUrl}/user/${userId}`);
  }

  updateProfile(profileId: number, profileData: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.profilesUrl}/${profileId}`, profileData);
  }

  createProfile(profileData: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.post<UserProfile>(this.profilesUrl, profileData);
  }
}
