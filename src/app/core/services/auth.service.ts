import { Injectable, inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { MembershipService } from './membership.service';
import { SignUpResource, User, UserProfile, AuthenticatedUserResource, SignInResource } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private injector = inject(Injector); // Usamos Injector para romper el ciclo

  private usersUrl = `${environment.apiUrl}/user`;
  private profilesUrl = `${environment.apiUrl}/profiles`;
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

  getCurrentUserId(): number | null {
    if (typeof window === 'undefined') return null;
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo).id : null;
  }

  getCurrentUsername(): string | null {
    if (typeof window === 'undefined') return null;
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo).username : null;
  }

  hasRole(role: string): boolean {
    if (typeof window === 'undefined') return false;
    const userInfo = localStorage.getItem('user_info');
    if (!userInfo) return false;
    const roles = JSON.parse(userInfo).roles as string[];
    return roles?.includes(role) ?? false;
  }

  login(credentials: SignInResource): Observable<AuthenticatedUserResource> {
    return this.http.get<User[]>(`${this.usersUrl}?email=${credentials.username}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          const user = users[0];
          const fakeResponse: AuthenticatedUserResource = {
            id: user.id,
            username: user.nombreUsuario,
            token: 'fake-jwt-token-for-' + user.id
          };

          localStorage.setItem('auth_token', fakeResponse.token);
          const userInfo = {
            id: user.id,
            username: user.nombreUsuario,
            roles: user.roles
          };
          localStorage.setItem('user_info', JSON.stringify(userInfo));
          this.loggedIn.next(true);

          return of(fakeResponse);
        }
        return throwError(() => new Error('User not found or password incorrect'));
      })
    );
  }

  register(signUpData: SignUpResource): Observable<UserProfile> {
    const newUser: Omit<User, 'id'> & { id: number } = {
      id: Date.now(),
      nombreUsuario: signUpData.fullName,
      email: signUpData.username,
      roles: ["ROLE_USER"]
    };

    return this.http.post<User>(this.usersUrl, newUser).pipe(
      switchMap(createdUser => {
        const membershipService = this.injector.get(MembershipService); // Obtención tardía
        const newProfile: Partial<UserProfile> = {
          userId: createdUser.id,
          fullName: createdUser.nombreUsuario,
          email: createdUser.email,
          phone: '',
          bio: '',
          avatarUrl: 'assets/imagen/Logo.png'
        };
        return membershipService.createProfile(newProfile);
      })
    );
  }

  changePassword(passwordData: any): Observable<any> {
    console.log('Simulating password change with data:', passwordData);
    return of({ success: true, message: 'Password changed successfully' });
  }

  logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
