import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserdataService} from '../localService/userdata';
import {AuthService} from '../auth.service';

@Component({
  selector: 'my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements  AfterViewInit {
  // data: Array<User>;
  constructor(  public userdata: UserdataService , public authservice: AuthService ) {
  }
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'first_name', 'middle_name', 'phone_number', 'email', 'edit'];


  // ngOnInit() {
    // this.dataSource = new MyTableDataSource(this.paginator, this.sort,
    //   this.userdata , this.authservice);
  // }

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
