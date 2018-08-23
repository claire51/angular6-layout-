import { Component, OnInit } from '@angular/core';
import {Transactions} from '../../model/Transactions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-roleboard',
  templateUrl: './roleboard.component.html',
  styleUrls: ['./roleboard.component.scss']
})
export class RoleboardComponent implements OnInit {
  firstFormGroup: FormGroup;
  transaction: Transactions = new Transactions();
  constructor(public auth: AuthService , private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      phone_number: ['', Validators.required],
      full_names: ['', Validators.required],
      id_number: [''],
      email: [''],
      address: [''],
    });

  }





}

