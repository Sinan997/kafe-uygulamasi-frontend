import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService, Roles } from 'core';

export const isAdmin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  if (authService.userValue && authService.userValue.role === Roles.Admin) {
    return true;
  } else {
    authService.logout();
    return false;
  }
};
