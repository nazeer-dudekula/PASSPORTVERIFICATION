import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service.service';
 
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService implements CanActivate {
  constructor(private authService: AuthService, public router:Router) {}

 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.decodeToken()) {
      return true;
    } 
    else{
      alert("need to login")
      this.router.navigate(['/passport-login']);
      return false;
    }
  }
}