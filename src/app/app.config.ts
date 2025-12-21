import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';
import {provideToastr} from 'ngx-toastr';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ClarityModule} from "@clr/angular";

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes), provideHttpClient(),
    provideToastr(),
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,

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
