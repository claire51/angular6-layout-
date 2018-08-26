import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {AuthService} from '../../auth.service';
import {Transactionservc} from '../../localService/transactionservc';

@Component({
  selector: 'app-viewtrade',
  templateUrl: './viewtrade.component.html',
  styleUrls: ['./viewtrade.component.scss']
})
export class ViewtradeComponent implements  AfterViewInit {

  constructor(public userdata: Transactionservc , public authservice: AuthService ) { }
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['transaction_code', 'invoice_amount', 'total_fee_amount', 'deposited_amount', 'transaction_status_id', 'created_at' ];


  ngAfterViewInit() {
    this.userdata.getdata().subscribe((data) => {
      // this.data = newHeroWithId;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    }, (response: Response) => {
      if (response.status <= 500) {
        this.authservice.showSnackBar(' could not load users');
      }
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  trackByUid(index, User1) {
    return User1.id;
  }

  openDialog(data): void {

    console.log(data);
  }

}
