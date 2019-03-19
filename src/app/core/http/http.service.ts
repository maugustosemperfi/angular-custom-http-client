import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPrefixInterceptor } from './interceptors/api-prefix.interceptors';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { SSOPrefixInterceptor } from './interceptors/sso.interceptor';

interface HttpCustomParam {
  [param: string]: string | string[];
}

// HttpClient is declared in a re-exported module, so we have to extend the original module to make it work properly
// (see https://github.com/Microsoft/TypeScript/issues/13897)
declare module '@angular/common/http/src/client' {
  export interface HttpClient {
    /**
     * Write custom methods to make an action at the request
     * Ex: disableLoadInterceptor(): HttpClient
     */

    /**
     * Disable ApiPrefixInterceptor for THIS request only
     */
    disableApiPrefix(): HttpClient;

    /**
     * Enable SSOInterceptor for THIS request only
     */
    enableSSOInterceptor(): HttpClient;

    /**
     * Disable LoaderInterceptor for THIS request only
     */
    disableLoaderInterceptor(): HttpClient;

    /**
     * Change url of controller
     * @param url
     */
    setControllerUrl(url): HttpClient;

    getWithParams(endpoint: string, params: HttpCustomParam): Observable<object>;
  }
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
  private url = '';

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
        this.injector.get(ApiPrefixInterceptor),
        this.injector.get(AuthorizationInterceptor),
        this.injector.get(LoaderInterceptor)
      ];
    }

    // Configure default Interceptors that can't be disabled here
    this.interceptors = [];
  }

  disableApiPrefix(): HttpClient {
    return this.removeInterceptor(ApiPrefixInterceptor);
  }

  enableSSOInterceptor(): HttpClient {
    return this.addInterceptor(this.injector.get(SSOPrefixInterceptor));
  }

  disableLoader(): HttpClient {
    return this.removeInterceptor(LoaderInterceptor);
  }

  setControllerUrl(url): HttpClient {
    this.url = url + '/';
    return this;
  }

  getWithParams(endpoint: string, params: HttpCustomParam) {
    return this.get(endpoint, { params });
  }

  // Override the original method to wire interceptors when triggering the request.
  request(method?: any, url?: any, options?: any): any {
    url = this.url + url;
    const interceptors = [...this.dynamicInterceptors, ...this.interceptors];
    const handler = interceptors.reduceRight((next, interceptor) => new HttpInterceptorHandler(next, interceptor), this.httpHandler);
    return new HttpClient(handler).request(method, url, options);
  }

  private removeInterceptor(interceptorType: Function): HttpService {
    const http = new HttpService(
      this.httpHandler,
      this.injector,
      this.dynamicInterceptors.filter(i => !(i instanceof interceptorType)),
      this.interceptors
    );

    http.setControllerUrl(this.url);
    return http;
  }

  private addInterceptor(interceptor: HttpInterceptor): HttpService {
    const http = new HttpService(this.httpHandler, this.injector, this.dynamicInterceptors.concat([interceptor]), this.interceptors);

    http.setControllerUrl(this.url);
    return http;
  }
}
