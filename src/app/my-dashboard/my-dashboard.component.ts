import {Component, OnInit} from '@angular/core';
import {UseAccounts } from '../model/Accounts';
import {AuthService} from '../auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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

  constructor( public auth: AuthService ) {
this.transfervalue = 0;
  }

  ngOnInit() {
  }




  }
