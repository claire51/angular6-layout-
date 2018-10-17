import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {Transactions} from '../../model/Transactions';
import {Item} from '../../model/Items';
import {TradeParty} from '../../model/TradeParty';
import {Transactionview} from '../../localService/transactionview';
import {Resource} from '../../model/Resource';
import {PaymentService} from '../../localService/payment.service';
import {Paymentresponse} from '../../model/Paymentresponse';
import {RegistrationResponse} from '../../model/registrationResponse';
import {ApproveService} from '../../localService/approve.service';

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
  transactionspending: Array<Transactions> = new Array<Transactions>();
  transactionscomplete: Array<Transactions> = new Array<Transactions>();
  transactionsactive: Array<Transactions> = new Array<Transactions>();
  items: Array<Item> = new  Array<Item>();
  trade_party: TradeParty = new TradeParty();
  useridz: number;
  email: string;
  role: string;
  isbuyer: boolean;
  isseller: boolean;
  broker: boolean;
  firstname: string;
  fullname: string;
  lastname: string;
  idnumber: string;
  county: string;
  editcolumnvalue: string;
  dataSourcepending: MatTableDataSource<any>;
  dataSourceActive: MatTableDataSource<any>;
  dataSourceComplete: MatTableDataSource<any>;
  resource: Resource = new Resource();
  paymentresp: Paymentresponse;
  approveresp: RegistrationResponse;
  viewstatus: boolean;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['transaction_code', 'item', 'invoice_amount', 'edit', 'pay'];
  constructor(public auth: AuthService, public transervice: Transactionview ,    private paymentservice: PaymentService,
              private router: Router, public authservice: AuthService, private approveservice: ApproveService) {
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
    if (this.auth.verified === 0 ) {
      this.router.navigate(['/verify']);
    }
  }
  ngAfterViewInit() {
    this.id1 = 0;
    if (this.transactions.length < 1) {
      this.transervice.getById(this.id1).subscribe((data) => {
        this.transactions = data;
        for (let transac of this.transactions) {
          this.transactionspending = this.transactions;
          this.dataSourcepending = new MatTableDataSource( this.transactions);
          this.dataSourceActive= new MatTableDataSource( this.transactions);
          this.dataSourceComplete = new MatTableDataSource( this.transactions);
        }
        this.transactionspending = this.transactions;
        this.dataSourcepending = new MatTableDataSource( this.transactions);
        this.dataSourceActive = new MatTableDataSource( this.transactions);
        this.dataSourceComplete = new MatTableDataSource( this.transactions);

        this.transactionscomplete = this.transactions;
        this.transactionsactive = this.transactions;
      }, (response: Response) => {
        if (response.status <= 500) {
          this.authservice.showSnackBar(' could not load users');
        }
      });
    }
  }
  trackByUid(index, User1) {
    return User1.id;
  }
  edittransaction(data): void {
    // if (this.id1 === 1) {
      this.authservice.transactionshelper = data;
      this.router.navigate(['/editrade']);

  }
  makepayment(data): void {
    this.authservice.transactionshelper = data;
    this.resource.id = this.authservice.transactionshelper.id;
    this.paymentservice.payment( this.resource).subscribe((resp) => {
      this.paymentresp = resp;
      if ( this.paymentresp.id) {
        this.authservice.showSnackBar('Transaction ' + this.resource.id + 'payment was '
          + this.paymentresp.CustomerMessage + '  Request code is '
          + this.paymentresp.transaction_code + ' Check your phone to complete payment' );
      }
      console.log(resp);
    }, (response: Response) => {
      if (response.status <= 500) {
        this.authservice.showSnackBar(' could not send request');
      }
    });
  }
  approvetranaction(data): void {
    this.authservice.transactionshelper = data;
    this.resource.id = this.authservice.transactionshelper.id;
    this.approveservice.payment( this.resource).subscribe((resp) => {
      this.approveresp = resp;
      if (this.approveresp.status) {
        this.authservice.showSnackBar('Transaction ' + this.resource.id + 'payment was Approved succesfully ' );
      }
    }, (response: Response) => {
      if (response.status <= 500) {
        this.authservice.showSnackBar(' could not send approve request');
      }
    });
  }
  }
