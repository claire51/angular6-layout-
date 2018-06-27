import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {User} from './model/User';


// why do you need defining window as any?
// check this: https://github.com/aws/aws-amplify/issues/678#issuecomment-389106098
(window as any).global = window;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isAuthenticated() {
    return this.loggedIn.asObservable();
  }
  constructor( private router: Router) { }
  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
