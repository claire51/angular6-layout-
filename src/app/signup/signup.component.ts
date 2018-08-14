import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../localService/register.service';

import {Profile} from '../model/profile';
import {RegistrationResponse} from '../model/registrationResponse';
import {tap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  profile: Profile;
  registrationresponse: any;
  private formSubmitAttempt: boolean;
  constructor(    private fb: FormBuilder , private registeruser: RegisterService) { }

  ngOnInit() {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      national_id: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.add(this.form.value);
    }
    this.formSubmitAttempt = true
    console.log('eeeeeeeeeee');
  }

  add(profile: Profile): void {
    this.registeruser.create(profile)
      .subscribe(
        registrationresponse => this.registrationresponse = registrationresponse);
    console.log(this.registrationresponse);
  }
}



