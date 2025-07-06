import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasRole('ROLE_ADMIN')) {
    return true;
  }

  // Si no es admin, redirigir a la página de cursos (o a una de "acceso denegado")
  router.navigate(['/courses']);
  return false;
};
