import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Just an example prefixing api url on requests when this interceptors is enabled
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({ url: 'http://your.custom.url/some-controller/' + req.url });
    return next.handle(req);
  }
}
