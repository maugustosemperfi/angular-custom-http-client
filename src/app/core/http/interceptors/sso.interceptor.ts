import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Imagine if you have your api and sso to authenticate the user
 * With this custom httpclient, you can disable the api and enable the sso interceptor for one request
 */
@Injectable()
export class SSOPrefixInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({ url: 'http://your.sso.url/some-controller/' + req.url });
    return next.handle(req);
  }
}
