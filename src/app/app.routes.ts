import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {EmailVerificationComponent} from './pages/email-verification/email-verification.component';
import {ProfilComponent} from './pages/profil/profil.component';
import {SupportComponent} from './pages/profil/support/support.component';
import {FriendsComponent} from './pages/profil/friends/friends.component';
import {ProfilInfoComponent} from './pages/profil/profil-info/profil-info.component';
import {HomeBoardingComponent} from './pages/boarding/home-boarding.component';
import {ManageComponent} from './pages/boarding/manage/manage.component';
import {BoardComponent} from './pages/boarding/board/board.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'email-verification', component: EmailVerificationComponent},
      {
        path: 'boarding', component: HomeBoardingComponent, children: [
          {path: '', component: BoardComponent},
          {path: 'manage', component: ManageComponent},
        ]
      },
      {
        path: 'profil', component: ProfilComponent, children: [
          {path: '', redirectTo: 'info', pathMatch: 'full'},
          {path: 'info', component: ProfilInfoComponent},
          {path: 'friends', component: FriendsComponent},
          {path: 'support', component: SupportComponent},
        ]
      },
    ],
  },
];
