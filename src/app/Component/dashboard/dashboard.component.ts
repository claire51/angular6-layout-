import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profiles',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
accountbal: number;
allocatedbal: number;
payablebal: number;
  constructor() {
    this.accountbal = 0.0;
   this. allocatedbal = 0.0;
    this.payablebal = 0.0;
  }

  ngOnInit() {
  }

}
