import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {MainLayoutLightComponent} from './components/main-layout-light/main-layout-light.component';
import {EmailVerificationComponent} from './pages/email-verification/email-verification.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'email-verification', component: EmailVerificationComponent},
    ],
  },
  {
    path: '',
    component: MainLayoutLightComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ],
  },
];
