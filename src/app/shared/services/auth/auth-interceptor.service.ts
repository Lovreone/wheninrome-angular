import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {        
        return this.authService.user.pipe(
            take(1), 
            exhaustMap((user) => {               
                if (!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    headers: new HttpHeaders().set('Authorization', `Bearer ${user?.token}`)
                });
                return next.handle(modifiedReq);
            })

        );
    }
    /* 
        take(1) gets user only once and we dont need to unsubscribe manually
        exhaustMap() waits for the first observable to complete (User), and gives us that obs.
        Within the exhaustMap's callback, we return a new observable (City[]), 
        which will replace our previous obs (User), we have started with. 
    */
}
