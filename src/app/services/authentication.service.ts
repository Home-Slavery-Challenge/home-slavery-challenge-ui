import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {apiAuth, apiLogin} from '../config';
import {UserClass, UserDetailClass} from '../types/user';
import {BehaviorSubject, tap} from 'rxjs';
import {ChallengeLite} from '../types/challenge';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public loggedUser: string | undefined;
  public isLoggedIn = false;
  public roles: string[] = [];
  public token: string | undefined;

  public registeredUser: UserClass = new UserClass()

  private userSubject = new BehaviorSubject<UserDetailClass>({});
  userFind$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
  }

  setRegisteredUser(user: UserClass) {
    this.registeredUser = user
  }

  getRegisteredUser() {
    return this.registeredUser
  }

  getRegisteredUsername() {
    return this.loggedUser
  }

  restoreAuth(): void {
    let jwt: any = localStorage.getItem('jwt');
    if (jwt) {
      jwt = this.jwtHelper.decodeToken(jwt)
      this.loggedUser = jwt.sub!
      this.isLoggedIn = true
      this.roles = jwt.roles
    }
  }

  login(user: any) {
    return this.http.post<any>(`${apiLogin}`, user, {observe: 'response'});
  }

  getToken() {
    this.restoreAuth()
    return this.jwtHelper.tokenGetter()
  }

  //
  // isTokenExpired(): Boolean {
  //   return this.jwtHelper.isTokenExpired(this.token!);
  // }
  //
  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.jwtHelper.decodeToken(this.token);
    console.log(decodedToken)
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt.split('Bearer ')[1]);
    this.token = jwt
    this.isLoggedIn = true
    this.decodeJWT();
  }

  //
  // loadToken() {
  //   this.token = localStorage.getItem('jwt')!;
  //   this.decodeJWT();
  // }
  //
  // isAdmin(): Boolean {
  //   if (!this.roles)
  //     return false;
  //   return this.roles.indexOf('ADMIN') >= 0;
  // }
  isAuthenticated(): Boolean {
    if (!this.roles)
      return false;
    return ['ADMIN', 'USER'].some(role => this.roles.includes(role));
  }


  registerUser(user: any) {
    return this.http.post(`${apiAuth}/register`, user, {observe: 'response'})
  }

  signOut(): void {
    this.loggedUser = undefined;
    this.roles = [];
    this.token = undefined;
    this.isLoggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/']);
  }

  validateEmail(code: any) {
    return this.http.get<any>(`${apiAuth}/verify-email/${code.code}`)
  }

  forgotPassword(email: string) {
    return this.http.get<any>(`${apiAuth}/forgot-password/${email}`)
  }

  getUserinfo(){
    return this.http.get<UserDetailClass>(`${apiAuth}/info`)  .pipe(
      tap((res) => this.userSubject.next(res))
    );
  }

  updatePassword(oldPassword: string, newPassword: string){
    return this.http.put<any>(`${apiAuth}/update-password`, {oldPassword, newPassword})
  }

}
