import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MyTableDataSource } from './my-table-datasource';
import {UserdataService} from '../localService/userdata';
import {AuthService} from '../auth.service';
import {User} from '../model/User';

@Component({
  selector: 'my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  data: Array<User> =  new Array<User>();
  constructor(  public userdata: UserdataService , public authservice: AuthService ) {
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MyTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'first_name', 'middle_name', 'phone_number', 'email'];


  ngOnInit() {
    this.dataSource = new MyTableDataSource(this.paginator, this.sort,
      this.userdata , this.authservice);
  }
}
