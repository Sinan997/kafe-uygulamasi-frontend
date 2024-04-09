import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'core';

export const isBusiness: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  if (authService.userValue && authService.userValue.role === 'business') {
    return true;
  } else {
    authService.logout();
    return false;
  }
};
