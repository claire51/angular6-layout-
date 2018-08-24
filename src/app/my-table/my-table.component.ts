import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MyTableDataSource } from './my-table-datasource';
import {UserdataService} from '../localService/userdata';
import {AuthService} from '../auth.service';

@Component({
  selector: 'my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  constructor(  public userdata: UserdataService , public authservice: AuthService) {
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MyTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'first_name', 'middle_name', 'phone_number', 'email'];


  ngOnInit() {
    this.dataSource.loadvalues();
    this.dataSource = new MyTableDataSource(this.paginator, this.sort,
      this.userdata , this.authservice);
  }
}
