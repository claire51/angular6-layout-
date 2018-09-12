import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {AuthService} from '../../auth.service';
import {Transactions} from '../../model/Transactions';
import {Router, ActivatedRoute} from '@angular/router';
import {Item} from '../../model/Items';
import {Transactionview} from '../../localService/transactionview';
import {PaymentService} from '../../localService/payment.service';
import {Paymentresponse} from '../../model/Paymentresponse';
import {Resource} from '../../model/Resource';
import {TradeRole} from '../../model/TradeRole';
import {TradeParty} from '../../model/TradeParty';

@Component({
  selector: 'app-viewtrade',
  templateUrl: './viewtrade.component.html',
  styleUrls: ['./viewtrade.component.scss']
})
export class ViewtradeComponent implements AfterViewInit {
  transactions: Array<Transactions>;
  transaction: Transactions;
  items: Array<Item> = new Array<Item>();
  trade_party: TradeParty = new TradeParty();
  useridz: number;

  constructor(public transervice: Transactionview, public authservice: AuthService
    , private router: Router, private route: ActivatedRoute, private paymentservice: PaymentService) {
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSourceb: MatTableDataSource<any>;
  pending: boolean;
  paymentresp: Paymentresponse;
  editcolumnvalue: string;
  resource: Resource = new Resource();
  id1: number;
  viewstatus: boolean;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['transaction_code', 'invoice_amount', 'total_fee_amount', 'deposited_amount', 'status.name', 'edit'];

  ngAfterViewInit() {
    this.useridz = (Number(localStorage.getItem('id')));
    this.id1 = +this.route.snapshot.params['id'];
    if (this.id1 === 1) {
      this.editcolumnvalue = 'Edit';
      this.pending = true;
    } else if (this.id1 === 2) {
      this.editcolumnvalue = 'Approve';
      this.pending = false;
    } else if (this.id1 === 3) {
      this.editcolumnvalue = 'View';
    }

    this.transervice.getById(this.id1).subscribe((data) => {
      this.transactions = data;
      this.dataSourceb = new MatTableDataSource(this.transactions);
      this.dataSourceb.sort = this.sort;
      this.dataSourceb.paginator = this.paginator;
      for (let transac of this.transactions) {
        for (let trade of  transac.trade_roles) {
          if (trade.transaction_role_id === 1) {
            this.trade_party = trade.trade_party;
            if (this.trade_party.user_id !== null && this.trade_party.user_id === this.useridz) {
              transac.isBuyer = true;
              this.viewstatus = true;
            } else {
              transac.isBuyer = false;
            }
          } else {
            transac.isBuyer = false;
            this.viewstatus = false;
          }
        }
        console.log(transac.isBuyer);
      }
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
    if (this.id1 === 1) {
      this.authservice.transactionshelper = data;
      console.log(this.authservice.transactionshelper);
      this.router.navigate(['/editrade']);
    } else if (this.id1 === 2) {
      this.router.navigate(['/editrade']);
    } else if (this.id1 === 3) {
      this.authservice.transactionshelper = data;
      this.router.navigate(['/editrade']);
    }
  }

  makepayment(data): void {
    this.authservice.transactionshelper = data;
    this.resource.id = this.authservice.transactionshelper.id;
    this.paymentservice.payment(this.resource).subscribe((resp) => {
      this.paymentresp = resp;
      if (this.paymentresp.id) {
        this.authservice.showSnackBar('Transaction ' + this.resource.id + 'payment was '
          + this.paymentresp.CustomerMessage + '  Request code is '
          + this.paymentresp.transaction_code + ' Check your phone to complete payment');
      }
      console.log(resp);
    }, (response: Response) => {
      if (response.status <= 500) {
        this.authservice.showSnackBar(' could not send request');
      }
    });
  }
}
