import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'core';
import { Roles } from '../constants/roles';

export const emptyRouter: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.userValue) {
    router.navigate(['account', 'login']);
    return false;
  }

  if (authService.userValue.role === Roles.Admin) {
    router.navigate(['/business-management']);
    return false;
  }
  if (authService.userValue.role === Roles.Business) {
    router.navigate(['/dashboard']);
    return false;
  }
  if (authService.userValue.role === Roles.Waiter) {
    router.navigate(['/table']);
    return false;
  }

  return true;
};
