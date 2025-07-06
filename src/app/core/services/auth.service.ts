import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { MembershipService } from './membership.service';

export interface SignInResource {
  username: string;
  password: string
}

export interface AuthenticatedUserResource {
  id: number;
  username: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private membershipService = inject(MembershipService);

  private usersUrl = `${environment.apiUrl}/users`;

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  private hasToken(): boolean {
    if (typeof localStorage === 'undefined') return false;
    return !!localStorage.getItem('auth_token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  getCurrentUserId(): number | null {
    if (typeof localStorage === 'undefined') return null;
    const userInfo = localStorage.getItem('user_info');
    if (!userInfo) return null;
    return JSON.parse(userInfo).id;
  }

  getCurrentUsername(): string | null {
    if (typeof localStorage === 'undefined') return null;
    const userInfo = localStorage.getItem('user_info');
    if (!userInfo) return null;
    return JSON.parse(userInfo).username;
  }

  login(credentials: SignInResource): Observable<AuthenticatedUserResource> {
    return this.http.get<any[]>(`${this.usersUrl}?email=${credentials.username}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          const user = users[0];
          const fakeResponse: AuthenticatedUserResource = {
            id: user.id,
            username: user.nombreUsuario,
            token: 'fake-jwt-token-for-dev-purpose-' + user.id
          };
          return of(fakeResponse).pipe(
            tap(response => {
              localStorage.setItem('auth_token', response.token);
              localStorage.setItem('user_info', JSON.stringify({ id: response.id, username: response.username }));
              this.loggedIn.next(true);
            })
          );
        }
        return throwError(() => new Error('User not found or password incorrect'));
      })
    );
  }

  register(signUpData: { username: string, password: string, fullName: string }): Observable<any> {
    const newUser = {
      id: Date.now(),
      nombreUsuario: signUpData.fullName,
      email: signUpData.username
    };
    return this.http.post<any>(this.usersUrl, newUser).pipe(
      switchMap(createdUser => {
        const newProfile = {
          userId: createdUser.id,
          fullName: createdUser.nombreUsuario,
          email: createdUser.email,
          phone: '',
          bio: '',
          avatarUrl: 'assets/imagen/Logo.png'
        };
        return this.membershipService.createProfile(newProfile);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
