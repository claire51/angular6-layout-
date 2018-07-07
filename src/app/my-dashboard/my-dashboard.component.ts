import {Component, OnInit} from '@angular/core';
import {UseAccounts } from '../model/Accounts';
import {AuthService} from '../auth.service';
@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent  implements  OnInit {
  cards = [
    { title: 'Saving Account ', balance: 500, cols: 2, rows: 1 },
    { title: 'Checking Account',  balance: 500, cols: 1, rows: 1 }
  ];
  users = new UseAccounts();
  transfervalue: number;
  transfervalue2: number;
  taxes: number;
  message: string;
  message2: string;

  constructor( public auth: AuthService ) {
this.transfervalue = 0;
this.transfervalue2 = 0;
    this.message = '';
    this.message2 = '';
  }

  ngOnInit() {
  }

calculate() {
  this.taxes = 0.01 * this.transfervalue;
  if ( this.transfervalue + this.taxes <= this.auth.userAccount.savingsBalance) {
 this.auth.userAccount.savingsBalance = this.auth.userAccount.savingsBalance -  (this.taxes + this.transfervalue);
    this.auth.userAccount.checkingBalance =  this.auth.userAccount.checkingBalance + this.transfervalue;
    this.message2 = '';
  } else {
    this.message2 = 'Not enough amount to transfer';
  }
}
calculate2() {
    if ( this.auth.userAccount.checkingBalance  >= this.transfervalue2 ) {
      this.auth.userAccount.savingsBalance = this.auth.userAccount.savingsBalance + this.transfervalue2 ;
      this.auth.userAccount.checkingBalance = this.auth.userAccount.checkingBalance - this.transfervalue2 ;
      this.message = '';
    }    else {
      this.message = 'Not enough amount to transfer';
    }


}

  }
