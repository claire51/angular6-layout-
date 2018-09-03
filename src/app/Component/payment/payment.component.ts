import {AfterViewInit, Component,  ViewChild} from '@angular/core';
import {Transactions} from '../../model/Transactions';
import {Item} from '../../model/Items';
import {Transactionview} from '../../localService/transactionview';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PaymentService} from '../../localService/payment.service';
import {Paymentresponse} from '../../model/Paymentresponse';
import {Resource} from '../../model/Resource';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements   AfterViewInit  {

  transactions: Array<Transactions>;
  paymentresp: Paymentresponse;
  items: Array<Item> = new  Array<Item>();
  resource: Resource;
  constructor(public transervice: Transactionview , public authservice: AuthService , private router: Router, private paymentservice: PaymentService ) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSourceb: MatTableDataSource<any>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['transaction_code', 'invoice_amount', 'total_fee_amount', 'deposited_amount', 'status.name', 'payment'];

  ngAfterViewInit() {
    this.transervice.getdata().subscribe((data) => {
      this.transactions = data;
      console.log(data)
      this.dataSourceb = new MatTableDataSource( this.transactions);
      this.dataSourceb.sort = this.sort;
      this.dataSourceb.paginator = this.paginator;
    }, (response: Response) => {
      if (response.status <= 500) {
        this.authservice.showSnackBar(' could not load users');
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceb.filter = filterValue;
  }
  trackByUid(index, User1) {
    return User1.id;
  }

  edittransaction(data): void {
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
}
