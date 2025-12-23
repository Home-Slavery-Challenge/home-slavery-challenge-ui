import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';
import {provideToastr} from 'ngx-toastr';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule, provideAnimations, provideNoopAnimations} from "@angular/platform-browser/animations";
import {ClarityModule} from "@clr/angular";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {tokenInterceptor} from './config/token-interceptor.interceptor';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes), provideHttpClient(withInterceptors([tokenInterceptor])),
    provideToastr(),
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    provideAnimationsAsync(),
    provideAnimations(),
    provideNoopAnimations(),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: [`${environment.apiUrl}`],
          disallowedRoutes: [""],
        },
      }),
    ),
  ],
};
