import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../localService/register.service';



import {Profile} from '../model/profile';
import {RegistrationResponse} from '../model/registrationResponse';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  profile: Profile;
  status: boolean;
  registrationresponse: RegistrationResponse;
  error: string;
  hide: boolean;
  private formSubmitAttempt: boolean;
  constructor(private fb: FormBuilder , private registeruser: RegisterService, private router: Router,
               private auth: AuthService) {
    this.hide = true;
  }

  ngOnInit() {
    this.auth.showloading = false;
    this.status = true;
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
    this.status = false;
    if (this.form.valid) {
      this.add(this.form.value);
    }
    this.formSubmitAttempt = true;
  }

  add(profile: Profile): void {
    this.error = null;
    this.registeruser.create(profile).subscribe((newHeroWithId) => {
      this.registrationresponse = newHeroWithId;
      if ( this.registrationresponse.status) {
        this.auth.resendphone = profile.phone_number;
        this.auth.showSnackBar('AccountCreated Created Succesfully.. Login to continue ');
        this.status = true;
        this.router.navigate(['/verify']);
      }
    }, (response: Response) => {
      if (response.status <= 500) {
        this.status = true;
        this.auth.showSnackBar('account with that email Already exist ..Try Another');
        this.error = 'account with that email exist';
      }
    });
  }

}



