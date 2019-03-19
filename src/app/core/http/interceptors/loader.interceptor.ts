import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

/**
 * Example of loading interceptor
 */
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /**
     * Open and close your loader when request start and close this when get the response
     */
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          /* Close loader */
        }
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          /* Close loader */
        }
        return Observable.throw(err);
      })
    );
  }
}
