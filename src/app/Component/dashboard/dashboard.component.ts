import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
accountbal: number;
allocatedbal: number;
payablebal: number;
  constructor(public auth: AuthService,   private router: Router) {
    this.accountbal = 0.0;
   this. allocatedbal = 0.0;
    this.payablebal = 0.0;
  }

  ngOnInit() {
    if (this.auth.verified === 0 ) {
      this.router.navigate(['/verify']);
    }
  }

}
