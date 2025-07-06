import { Injectable, inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { MembershipService } from './membership.service';
import { SignUpResource, User, UserProfile, AuthenticatedUserResource, SignInResource } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private injector = inject(Injector);

  private authUrl = `${environment.apiUrl}/authentication`;
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  private hasToken(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('auth_token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  getCurrentUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;
    const decoded = this.decodeToken(token);
    return decoded ? Number(decoded.sub) : null;
  }

  getCurrentUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const decoded = this.decodeToken(token);
    return decoded ? decoded.name : null;
  }

  hasRole(role: string): boolean {
    const token = this.getToken();
    if (!token) return false;
    const decoded = this.decodeToken(token);
    const roles = decoded ? (decoded.roles as string[]) : [];
    return roles.includes(role);
  }

  login(credentials: SignInResource): Observable<AuthenticatedUserResource> {
    return this.http.post<AuthenticatedUserResource>(`${this.authUrl}/sign-in`, credentials).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        this.loggedIn.next(true);
        const membershipService = this.injector.get(MembershipService);
        membershipService.fetchCurrentUserPlan();
      })
    );
  }

  register(signUpData: SignUpResource): Observable<any> {
    const backendSignUpResource = {
      username: signUpData.username,
      password: signUpData.password,
      roles: ['ROLE_USER']
    };
    return this.http.post(`${this.authUrl}/sign-up`, backendSignUpResource);
  }

  changePassword(passwordData: any): Observable<any> {
    console.log('Password change would call a real backend endpoint');
    return of({ success: true });
  }

  logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth_token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
