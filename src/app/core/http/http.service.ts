import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import { Observable } from 'rxjs';

export interface HttpClient {
  /**
   * Write custom methods to make an action at the request
   * Ex: disableLoadInterceptor(): HttpClient
   */
}

class HttpInterceptorHandler implements HttpHandler {
  constructor(private next: HttpHandler, private interceptor: HttpInterceptor) {}

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(request, this.next);
  }
}

/**
 * Allows to override default dynamic interceptors that can be disabled with the HttpService extension.
 * You should better configure these interceptors directly in the constructor below for better readability.
 *
 */
export const HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor>('HTTP_DYNAMIC_INTERCEPTORS');

/**
 * Allows to override default static interceptors that can't be disabled with the HttpService extension.
 * You shouldn't configure these interceptors on const below. Do it in the HttpService class.
 */
export const HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor>('HTTP_INTERCEPTORS');

@Injectable()
export class HttpService extends HttpClient {
  constructor(
    private httpHandler: HttpHandler,
    private injector: Injector,
    @Optional() @Inject(HTTP_DYNAMIC_INTERCEPTORS) private dynamicInterceptors: HttpInterceptor[] = [],
    @Optional() @Inject(HTTP_INTERCEPTORS) private interceptors: HttpInterceptor[]
  ) {
    super(httpHandler);

    if (!this.dynamicInterceptors) {
      // Configure default dynamicInterceptors that can be disabled here
      this.dynamicInterceptors = [
        // this.injector.get(ApiPrefixInterceptor),
        // this.injector.get(AuthorizationInterceptor),
        // this.injector.get(LoadingInterceptor)
      ];
    }

    // Configure default Interceptors that can't be disabled here
    this.interceptors = [];
  }

  // Override the original method to wire interceptors when triggering the request.
  request(method?: any, url?: any, options?: any): any {
    const interceptors = [...this.dynamicInterceptors, ...this.interceptors];
    const handler = interceptors.reduceRight((next, interceptor) => new HttpInterceptorHandler(next, interceptor), this.httpHandler);
    return new HttpClient(handler).request(method, url, options);
  }

  private removeInterceptor(interceptorType: Function): HttpService {
    return new HttpService(
      this.httpHandler,
      this.injector,
      this.dynamicInterceptors.filter(i => !(i instanceof interceptorType)),
      this.interceptors
    );
  }

  private addInterceptor(interceptor: HttpInterceptor): HttpService {
    return new HttpService(this.httpHandler, this.injector, this.dynamicInterceptors.concat([interceptor]), this.interceptors);
  }
}
