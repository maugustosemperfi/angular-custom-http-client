import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * An interceptor that will set the Bearer token at the authorization header at every request when enabled
 */
@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.myToken()}`
        }
      });
    }

    return next.handle(req);
  }

  /**
   * Sure, you won't do this on the interceptor, but for the example we will do this here
   */
  private isAuthenticated() {
    return true;
  }

  private myToken() {
    return 'big-fucking-non-sense-string';
  }
}
