import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {TradeParty} from '../model/TradeParty';
import {TradeRole} from '../model/TradeRole';
import {Transactions} from '../model/Transactions';
import {Delivery} from '../model/Delivery';
import {Item} from '../model/Items';
import {FeeAllocation} from '../model/FeeAllocation';
import {Classification} from '../model/Classification';
import {AgentFeeType} from '../model/AgentFeeType';
import {Transactionservc} from '../localService/transactionservc';
import {User} from '../model/User';
@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent  implements  OnInit {

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
