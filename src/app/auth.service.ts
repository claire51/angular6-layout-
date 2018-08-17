import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';


// why do you need defining window as any?
// check this: https://github.com/aws/aws-amplify/issues/678#issuecomment-389106098
(window as any).global = window;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showloading: boolean;
  isAuthenticated() {
    return this.loggedIn.asObservable();
  }

  constructor( private router: Router) {
    this.showloading = false;
  }

  login() {
    if (localStorage.getItem('token') !== '' ) {
      this.loggedIn.next(true);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
  getAuthorizationToken() {
    return this.localStorage.getItem('token');
  }

}
