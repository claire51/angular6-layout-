import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent  implements  OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  buyer = true;
  broker = false;

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
    this.thirdFormGroup = this._formBuilder.group({
      id: [''],
      created_at: [''],
      updated_at: [''],
      name: ['', Validators.required],
      description: ['' , Validators.required],
      quantity: ['3' , Validators.required],
      unit_of_measures_id: ['1'],
      transactions_id: ['0']
    });
  }
  onsubmitformone() {
    if (this.firstFormGroup.valid) {
      console.log(this.firstFormGroup.value.seller_Email);
    }
  }

  onsubmitformtwo() {

  }
  onsubmitformthree() {

  }
  finishtransaction() {
console.log('yep fucker');
  }


  }
