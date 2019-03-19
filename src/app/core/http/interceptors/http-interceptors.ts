import { ApiPrefixInterceptor } from './api-prefix.interceptors';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { LoaderInterceptor } from './loader.interceptor';
import { SSOPrefixInterceptor } from './sso.interceptor';

export const httpInterceptors = [ApiPrefixInterceptor, SSOPrefixInterceptor, LoaderInterceptor, AuthorizationInterceptor];
