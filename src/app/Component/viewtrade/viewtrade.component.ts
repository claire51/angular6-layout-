import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {AuthService} from '../../auth.service';
import {Transactions} from '../../model/Transactions';
import {Router, ActivatedRoute} from '@angular/router';
import {Item} from '../../model/Items';
import {Transactionview} from '../../localService/transactionview';
import {PaymentService} from "../../localService/payment.service";

@Component({
  selector: 'app-viewtrade',
  templateUrl: './viewtrade.component.html',
  styleUrls: ['./viewtrade.component.scss']
})
export class ViewtradeComponent implements  AfterViewInit {
  transactions: Array<Transactions>;
  items: Array<Item> = new  Array<Item>();
  constructor(public transervice: Transactionview , public authservice: AuthService
    , private router: Router, private route: ActivatedRoute, private paymentservice: PaymentService ) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSourceb: MatTableDataSource<any>;
  pending: boolean;
  editable: boolean;
  editcolumnvalue: string;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['transaction_code', 'invoice_amount', 'total_fee_amount', 'deposited_amount', 'status.name', 'edit', 'pay'];

  ngAfterViewInit() {

    const id1 = +this.route.snapshot.params['id'];
    console.log(id1 + 'xxxxxxxxxxxxxxxxxx');
    if (id1 === 1) {
      editcolumnvalue = 'Edit';
      pending = true;
    } else if (id1 === 2) {
      editcolumnvalue = 'Approve';
      pending = false;
      editable = false;
    } else if (id1 === 3) {
      editcolumnvalue = 'View';
      editable = false;
    }

    this.transervice.getById(id1).subscribe((data) => {
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
    if (id1 === 1) {
      this.authservice.transactionshelper = data;
      console.log(this.authservice.transactionshelper);
      this.router.navigate(['/editrade']);
    } else if (id1 === 2) {
      editable = false;
      this.router.navigate(['/editrade']);
    } else if (id1 === 3) {
      this.authservice.transactionshelper = data;
      this.router.navigate(['/editrade']);
    }
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
}
