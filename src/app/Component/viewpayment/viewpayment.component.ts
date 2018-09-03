import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ViewpaymentService} from '../../localService/viewpayment.service';
import {Payments} from '../../model/Payments';

@Component({
  selector: 'app-viewpayment',
  templateUrl: './viewpayment.component.html',
  styleUrls: ['./viewpayment.component.scss']
})
export class ViewpaymentComponent implements AfterViewInit {
  payments: Array<Payments>;
  constructor( public authservice: AuthService , private router: Router, private viewpaymentservice: ViewpaymentService ) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSourceb: MatTableDataSource<any>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['transaction_code', 'amount', 'status', 'created_at'];

  ngAfterViewInit() {
    this.viewpaymentservice.getdata().subscribe((data) => {
      this.payments = data;
      console.log(data);
      this.dataSourceb = new MatTableDataSource( this.payments);
      this.dataSourceb.sort = this.sort;
      this.dataSourceb.paginator = this.paginator;
    }, (response: Response) => {
      if (response.status <= 500) {
        this.authservice.showSnackBar(' could not load payment');
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


}
