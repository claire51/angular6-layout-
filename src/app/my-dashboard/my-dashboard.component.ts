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

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  buyer = true;
  broker = true;

  constructor( public auth: AuthService , private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      mobile_No: ['' , Validators.required],
      buyer_Fullname: ['', Validators.required],
      buyer_Idno: ['' ],
      buyer_Email: [''],
      seller_Email: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      agent_mobl: [''],
      agent_email: [''],

      del_cntry: ['' , Validators.required],
      del_cnty: ['' , Validators.required],
      del_twn: ['' , Validators.required],
      del_strt: ['' , Validators.required],
      del_ln: [''],
      del_cmt: ['']
    });
  }



  }
