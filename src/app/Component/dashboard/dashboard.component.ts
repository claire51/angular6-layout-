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
  agreestatuz: number;
  dataSourcepending: MatTableDataSource<any>;
  dataSourceActive: MatTableDataSource<any>;
  dataSourceComplete: MatTableDataSource<any>;
  resource: Resource = new Resource();
  agreeresource: Agreetransaction = new Agreetransaction();
  paymentresp: Paymentresponse;
  approveresp: RegistrationResponse;
  viewstatus: boolean;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['transaction_code', 'item', 'invoice_amount', 'edit', 'pay'];
  displayedColumnscomplete = ['transaction_code', 'item', 'invoice_amount', 'edit'];
  constructor(public auth: AuthService, public accountservice: AccountService ,   public transervice: Transactionview ,    private paymentservice: PaymentService,
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
    this.id1 = 0;
    this.useridz = (Number(localStorage.getItem('id')));
    if (this.transactions.length < 1) {
      this.transervice.getById(this.id1).subscribe((data) => {
        this.transactions = data;
        for (let transac of this.transactions) {
          for (let item of transac.items) {
            transac.itemname = item.name;
          }

          if (transac.transaction_status_id === 1 ) {
            transac.isBuyer = true;
            transac.isAgreed = true;
            transac.selleragree = true;
            for (let trade of  transac.trade_roles) {
              if (trade.transaction_role_id === 1 ) {
                if ( trade.trade_party.user_id !== null &&  this.useridz  === trade.trade_party.user_id) {
                  if (transac.agreed_status === 1) {
                    transac.isBuyer = false;
                  } else {
                    transac.selleragree = false;
                  }
                }
              }
              if (trade.transaction_role_id === 2 ) {
                if ( trade.trade_party.user_id !== null &&  this.useridz  === trade.trade_party.user_id) {
                  if (transac.agreed_status === 1) {
                    transac.isAgreed = true;
                  } else {transac.isAgreed = false}
                }
              }
            }
            this.transactionspending.push(transac);
          } else if (transac.transaction_status_id === 2) {
            transac.isBuyer = true;
            for (let trade of  transac.trade_roles) {
              if (trade.transaction_role_id === 1 ) {
                if ( trade.trade_party.user_id !== null &&  this.useridz  === trade.trade_party.user_id) {
                  if (transac.agreed_status === 1) {
                    transac.isBuyer = false;
                  }
                }
              }}
            this.transactionsactive.push(transac) ;
            this.viewstatus = false;
          } else if ( transac.transaction_status_id === 3) {
            this.transactionscomplete.push(transac) ;
            this.viewstatus = false;
          }
        }
        this.dataSourcepending = new MatTableDataSource( this.transactionspending);
        this.dataSourceActive = new MatTableDataSource( this.transactionsactive);
        this.dataSourceComplete = new MatTableDataSource( this.transactionscomplete);
        console.log(this.transactionspending);
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
        this.logicchecktransaction();
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
    this.approveservice.paymentapprove( this.resource).subscribe((resp) => {
      this.approveresp = resp;
      if (this.approveresp.status) {
        this.authservice.showSnackBar('Transaction ' + this.resource.id + 'payment was Approved succesfully ' );
        this.logicchecktransaction();
      }
    }, (response: Response) => {
      if (response.status <= 500) {
        this.authservice.showSnackBar(' could not send approve request');
      }
    });
  }
   agreetotransaction(data) {
     this.authservice.transactionshelper = data;
     this.resource.id = this.authservice.transactionshelper.id;
     this.agreeresource.id = this.resource.id;
     this.agreeresource.status = 1;
     this.agreeservice.agreetrade( this.agreeresource).subscribe((resp) => {
       this.approveresp = resp;
       if (this.approveresp.status) {
         this.authservice.showSnackBar('You agreed to trade , transaction no: ' + this.resource.id + '  the buyer will be notified to go on  to trade payment  ' );
       this.logicchecktransaction();
       }
     }, (response: Response) => {
       if (response.status <= 500) {
         this.authservice.showSnackBar(' could not send Agreement request');
       }
     });

   }

   declinetransaction(data) {
     this.authservice.transactionshelper = data;
     this.resource.id = this.authservice.transactionshelper.id;
     this.agreeresource.id = this.resource.id;
     this.agreeresource.status = 2;
     this.agreeservice.agreetrade( this.agreeresource).subscribe((resp) => {
       this.approveresp = resp;
       if (this.approveresp.status) {
         this.authservice.showSnackBar('You Delcined to trade , transaction no : ' + this.resource.id  );
         this.logicchecktransaction();
       }
     }, (response: Response) => {
       if (response.status <= 500) {
         this.authservice.showSnackBar(' could not send decline request');
       }
     });

   }

  openDialog(data): void {
    this.authservice.transactionshelper = data;
    const dialogRef = this.dialog.open(DialogboxviewComponent, {
      width: '500px',
      autoFocus: true,
      data: this.authservice.transactionshelper
    });

    dialogRef.afterClosed().subscribe(result => {
      this.agreestatuz = result;
      if (this.agreestatuz === 1) {
        this.agreetotransaction(data);
      } else if ( this.agreestatuz === 2) {
        this.declinetransaction(data);
      } else {
        console.log('dialog closed');
      }
    });
  }





}

