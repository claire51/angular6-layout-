import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent  implements  OnInit {
  cards = [
    { title: 'Saving Account ', balance: 500, cols: 2, rows: 1 },
    { title: 'Checking Account',  balance: 500, cols: 1, rows: 1 }
  ];

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor( public auth: AuthService , private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      buyer_mobl: ['', Validators.required],
      buyer_email: ['', Validators.required],
      seller_mobl: ['', Validators.required],
      seller_email: ['', Validators.required],
      agent_mobl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }



  }
