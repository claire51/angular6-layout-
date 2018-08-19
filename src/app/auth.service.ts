import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {AppConfig} from './common/config/app.config';


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

  constructor( private router: Router, private snackBar: MatSnackBar) {
    this.showloading = false;
  }

  login() {
    if (localStorage.getItem('token') !== '' && localStorage.getItem('token') !== 'notoken') {
      this.loggedIn.next(true);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
  getAuthorizationToken() {
    if (localStorage.getItem('token') !== '' ) {
      return localStorage.getItem('token');
    }
  }

  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(name, 'OK', config);
  }
}
