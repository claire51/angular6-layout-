import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {User} from './model/User';
import {UseAccounts} from './model/Accounts';


// why do you need defining window as any?
// check this: https://github.com/aws/aws-amplify/issues/678#issuecomment-389106098
(window as any).global = window;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  message: string;
  allAccounts: Array<UseAccounts> = [ {
    savingsBalance: 0,
    checkingBalance: 1000000000,
    user: 'tstark',
    pass: 'FEman'
  }, {
    savingsBalance: 1337.37,
    checkingBalance: 420,
    user: 'bwidow',
    pass: 'gunsgunsgunsguns'
  }, {
    savingsBalance: 12,
    checkingBalance: 5.92,
    user: 'spiderman',
    pass: 'doeswhateveraspidercan'
  }, {
    savingsBalance: 0,
    checkingBalance: 0,
    user: 'rastley',
    pass: 'NEVERGONNAtellaLIE'
  }
  ];
  userAccount = new UseAccounts();
  isAuthenticated() {
    return this.loggedIn.asObservable();
  }
  constructor( private router: Router) { }
  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      this.userAccount =  this.allAccounts.filter(item => item.user === user.userName && item.pass === user.password )[0];
      // console.log(this.userAccount);
      if (this.userAccount) {
        this.loggedIn.next(true);
        this.router.navigate(['/dashboard']);
      }
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
