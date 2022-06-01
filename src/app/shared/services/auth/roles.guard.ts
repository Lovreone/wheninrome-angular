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
    return this.authService.getUserProfile()
      .pipe(
        take(1),
        map((user) => {      
          const isAdmin = user?.roles.includes(UserRole.Admin);
          console.warn('ROLES GUARD: \nuser:', user, '\nroles:', user.roles, '\nisAdmin:', isAdmin); // TODO: Remove me
          if (isAdmin) {
            return true;
          }
          return this.router.createUrlTree(['portal']);
        })
      );
  }
}
