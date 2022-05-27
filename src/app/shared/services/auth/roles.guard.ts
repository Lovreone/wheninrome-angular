import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserRole } from './../../../../utils/enum';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const userRoles = this.getUserRoles(user?.token);
        const isAdmin = userRoles.includes(UserRole.Admin);
        console.warn('ROLES GUARD> user:', user, 'roles:', userRoles, 'isAdmin:', isAdmin); // TODO: Remove me
        if (isAdmin) {
          return true;
        }
        return this.router.createUrlTree(['portal']);
      })
    );
  }

  /** We get JWT segment containing user data (inluding roles array), 
  decode it, parse it, and extract user roles from it */
  private getUserRoles(token: string | null | undefined): Array<string> {
    if (!token) {
      return [];
    }
    return JSON.parse(
      atob(token.split('.')[1])
    ).roles;
  }
}
