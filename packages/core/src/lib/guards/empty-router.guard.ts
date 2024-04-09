import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'core';

export const emptyRouter: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.userValue && authService.userValue.role === 'admin') {
    router.navigate(['/business-management']);
  } else {
    router.navigate(['/dashboard']);
  }
  return true;
};
