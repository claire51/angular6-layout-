import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {Transactions} from '../../model/Transactions';
import {Item} from '../../model/Items';
import {TradeParty} from '../../model/TradeParty';
import {Transactionview} from '../../localService/transactionview';

@Component({
  selector: 'app-profiles',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
accountbal: number;
allocatedbal: number;
  id1: number;
payablebal: number;
  transactions: Array<Transactions>;
  items: Array<Item> = new  Array<Item>();
  trade_party: TradeParty = new TradeParty();
  useridz: number;
  email: string;
  firstname: string;
  fullname: string;
  lastname: string;
  idnumber: string;
  county: string;
  constructor(public auth: AuthService, public transervice: Transactionview , private router: Router,public authservice: AuthService) {
    this.accountbal = 0.0;
   this. allocatedbal = 0.0;
    this.payablebal = 0.0;
    this.email = localStorage.getItem('email');
    this.fullname = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname');
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');
    this.idnumber = localStorage.getItem('idnumber');
    this.county = localStorage.getItem('county');
  }

  ngOnInit() {
    this.id1 = 0;
    if (this.auth.verified === 0 ) {
      this.router.navigate(['/verify']);
    }
    this.transervice.getById(this.id1).subscribe((data) => {
      this.transactions = data;
    }, (response: Response) => {
      if (response.status <= 500) {
        this.authservice.showSnackBar(' could not load users');
      }
    });
  }

}
