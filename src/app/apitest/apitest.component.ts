import { Component, OnInit , ViewContainerRef } from '@angular/core';
import {CrudService} from '../services/crud.service';
import {UseAccounts} from '../model/Accounts';

@Component({
  selector: 'app-apitest',
  templateUrl: './apitest.component.html',
  styleUrls: ['./apitest.component.scss']
})
export class ApitestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
