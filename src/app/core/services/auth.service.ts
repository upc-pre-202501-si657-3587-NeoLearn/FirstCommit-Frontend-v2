import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';

// Cuando el iam-service esté listo, reemplazarás estas interfaces
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

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  // URL del endpoint de autenticación (cuando esté listo)
  // private authUrl = `${environment.apiUrl}/iam/authentication`;

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

  login(credentials: SignInResource): Observable<AuthenticatedUserResource> {
    // --- SIMULACIÓN ---
    // En el futuro, esta sección hará la llamada HTTP real:
    // return this.http.post<AuthenticatedUserResource>(`${this.authUrl}/sign-in`, credentials).pipe(
    //   tap(response => {
    //     localStorage.setItem('auth_token', response.token);
    //     this.loggedIn.next(true);
    //   })
    // );

    // Por ahora, simulamos una respuesta exitosa y creamos un token falso.
    console.log('Attempting login with:', credentials);
    const fakeResponse: AuthenticatedUserResource = {
      id: 1,
      username: credentials.username,
      token: 'fake-jwt-token-for-dev-purpose'
    };

    return of(fakeResponse).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        this.loggedIn.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
