import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Input } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class myauthGuard implements CanActivate {
  constructor(private route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (typeof window !== 'undefined') {
      if (!sessionStorage.getItem('IsLoggedIn')) {
        if (route.data['role'] == 'user') {
          this.route.navigate(['/login-user']);
          return false;
        } else if (route.data['role'] == 'admin') {
          this.route.navigate(['/login-admin']);
          return false;
        }
      }

      if (
        sessionStorage.getItem('Role') == 'User' &&
        route.data['role'] == 'user'
      ) {
        return true;
      }

      if (
        sessionStorage.getItem('Role') == 'Admin' &&
        route.data['role'] == 'admin'
      ) {
        return true;
      }

      if (
        sessionStorage.getItem('Role') == 'Admin' &&
        route.data['role'] == 'user'
      ) {
        this.route.navigate(['/admin']);
        return true;
      }

      if (
        sessionStorage.getItem('Role') == 'User' &&
        route.data['role'] == 'admin'
      ) {
        this.route.navigate(['/user']);
        return true;
      }

      this.route.navigate(['/home']);
      return false;
    }
    return false;
  }
}
