import { ApiPrefixInterceptor } from './api-prefix.interceptors';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { LoaderInterceptor } from './loader.interceptor';
import { ControlAcessoSSOPrefixInterceptor } from './sso.interceptor';

export const httpInterceptors = [
  ApiPrefixInterceptor,
  ControlAcessoSSOPrefixInterceptor,
  LoaderInterceptor,
  AuthorizationInterceptor
];
