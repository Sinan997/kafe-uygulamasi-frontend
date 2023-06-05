import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtModule as jwt } from "@auth0/angular-jwt";


export const isLoggedIn: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if(authService.isLoggedIn()){
    return true
  }else{
    router.navigate(['menu'])
    return false
  }
};
