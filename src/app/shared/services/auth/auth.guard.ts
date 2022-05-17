import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  CanActivate,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean>{
    return this.authService.user.pipe(
      map((user) => {
        return !!user;
      }),
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
