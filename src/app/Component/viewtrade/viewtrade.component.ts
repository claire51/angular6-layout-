import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {AuthService} from '../../auth.service';
import {Transactionservc} from '../../localService/transactionservc';
import {Transactions} from '../../model/Transactions';

@Component({
  selector: 'app-viewtrade',
  templateUrl: './viewtrade.component.html',
  styleUrls: ['./viewtrade.component.scss']
})
export class ViewtradeComponent implements  AfterViewInit {
  transactions: Array<Transactions>;
  constructor(public transervice: Transactionservc , public authservice: AuthService ) { }
  @ViewChild(MatSort) sort: MatSort;
  dataSourceb: MatTableDataSource<any>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['transaction_code', 'invoice_amount', 'total_fee_amount', 'deposited_amount', 'transaction_status_id', 'created_at', 'edit'];

  ngAfterViewInit() {
    this.transervice.getdata().subscribe((data) => {
      // this.data = newHeroWithId;
      this.transactions = data;

      this.dataSourceb = new MatTableDataSource( this.transactions);
      this.dataSourceb.sort = this.sort;
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

  openDialog(data): void {

    console.log(data);
  }

}
