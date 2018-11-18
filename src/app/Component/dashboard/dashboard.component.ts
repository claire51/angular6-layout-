import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Transactions} from '../../model/Transactions';
import {Item} from '../../model/Items';
import {TradeParty} from '../../model/TradeParty';
import {Transactionview} from '../../localService/transactionview';
import {Resource} from '../../model/Resource';
import {PaymentService} from '../../localService/payment.service';
import {Paymentresponse} from '../../model/Paymentresponse';
import {RegistrationResponse} from '../../model/registrationResponse';
import {ApproveService} from '../../localService/approve.service';
import {AgreeService} from '../../localService/agree.service';
import {Agreetransaction} from '../../model/Agreetransaction';
import {DialogboxviewComponent} from '../dialogboxview/dialogboxview.component';
import {AccountService} from '../../localService/account.service';
import {Mlinziaccount} from '../../model/Mlinziaccount';

@Component({
  selector: 'app-profiles',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit ,  AfterViewInit {
accountbal: number;
allocatedbal: number;
  id1: number;
payablebal: number;
  transactions: Array<Transactions> = new Array<Transactions>();
  account: Mlinziaccount = new Mlinziaccount();
  items: Array<Item> = new  Array<Item>();
  email: string;
  role: string;
  firstname: string;
  fullname: string;
  lastname: string;
  idnumber: string;
  county: string;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['transaction_code', 'item', 'invoice_amount', 'edit', 'pay'];
  displayedColumnscomplete = ['transaction_code', 'item', 'invoice_amount', 'edit'];
  constructor(public auth: AuthService, public accountservice: AccountService ,
              public transervice: Transactionview ,    private paymentservice: PaymentService,
              private router: Router, public authservice: AuthService, private approveservice: ApproveService,
              private agreeservice: AgreeService, public dialog: MatDialog) {
    this.accountbal = 0.0;
   this. allocatedbal = 0.0;
    this.payablebal = 0.0;
    this.role = 'buyer';
    this.email = localStorage.getItem('email');
    this.fullname = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname');
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');
    this.idnumber = localStorage.getItem('idnumber');
    this.county = localStorage.getItem('county');
  }

  ngOnInit() {
    this.accountservice.getsingledata().subscribe((data) => {
      this.account = data;
    }, (response: Response) => {
      if (response.status <= 500) {
        this.authservice.showSnackBar(' could not load users');
      }
    });

    console.log(screen.width)
    if (this.auth.verified === 0 ) {
      this.router.navigate(['/verify']);
    } else {

    }
  }
  ngAfterViewInit() {
    this.logicchecktransaction();
  }
  logicchecktransaction() {
  }




  trackByUid(index, User1) {
    return User1.id;
  }
  edittransaction(data): void {
    // if (this.id1 === 1) {
      this.authservice.transactionshelper = data;
      this.router.navigate(['/jjjjjj']);

  }

}

