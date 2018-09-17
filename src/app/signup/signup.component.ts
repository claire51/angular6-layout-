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
      first_name: ['', Validators.compose([ Validators.required, Validators.minLength(3), Validators.pattern(/[A-Za-z]/)])],
      middle_name: ['', Validators.pattern(/[A-Za-z]/)],
      last_name: ['',  Validators.compose([ Validators.required, Validators.minLength(3), Validators.pattern(/[A-Za-z]/)])],
      phone_number: ['', Validators.compose([Validators.required, Validators.pattern(/^07\d{8}$/)]) ],
      national_id: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      email: ['', Validators.compose([Validators.required, Validators.email]) ],
      password: ['',  Validators.compose([ Validators.required, Validators.minLength(3)])],
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
        this.router.navigate(['/login']);
      }
    }, (response: Response) => {
      if (response.status <= 500) {
        this.status = true;
        this.auth.showSnackBar('account with that email/phone Number Already exist ..Try Another');
        this.error = 'account with that email/phone Number exist';
      }
    });
  }



}



