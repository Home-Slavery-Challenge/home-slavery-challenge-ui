import {HttpInterceptorFn} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {inject} from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);

  const isAuthRoute =
    req.url.includes('/api/login') ||
    req.url.includes('/api/auth/register');

  if (isAuthRoute) {
    return next(req);
  }

  const jwt = authService.getToken();

  if (!jwt) {
    return next(req);
  }

  const reqWithToken = req.clone({
    setHeaders: {Authorization: `Bearer ${jwt}`},
  });

  return next(reqWithToken);
};
