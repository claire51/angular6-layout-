import { Component, OnInit } from '@angular/core';
import {Verifies} from '../../model/Verifies';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {VerifyerService} from '../../localService/verifyer.service';
import {Resender} from '../../model/Resender';
import {RegistrationResponse} from '../../model/registrationResponse';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResenderService} from '../../localService/resender.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  form: FormGroup;
  formresend: FormGroup;
verifies: Verifies = new Verifies();
resend: Resender = new Resender();

  step: number

  registrationresponse: RegistrationResponse;
  error: string;
  status: boolean;
  private formSubmitAttempt: boolean;
  isLoggedIn$: Observable<boolean>;
  constructor(private fb: FormBuilder, public auth: AuthService , private router: Router,
              private verifyersevice: VerifyerService, private resenderservice: ResenderService) { this.step = 1; }

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isAuthenticated();
    this.status = true;
    this.form = this.fb.group({
      verification_code: ['', Validators.required]
    });
    this.formresend = this.fb.group({
      phone_number: [this.auth.resendphone, Validators.required]
    });
  }
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }  isFieldInvalid2(field: string) {
    return (
      (!this.formresend.get(field).valid && this.formresend.get(field).touched) ||
      (this.formresend.get(field).untouched && this.formSubmitAttempt)
    );
  }
  onSubmit() {
    if (this.form.valid) {
      this.status = false;
      this.verifyz(this.form.value);
    }
    this.formSubmitAttempt = true;
  }
  onSubmitformb() {
    if (this.formresend.valid) {
      this.status = false;
      this.resendz(this.formresend.value);
    }
    this.formSubmitAttempt = true;
  }

  verifyz(verif: Verifies): void {
    this.error = null;
    this.verifyersevice.verifyz(verif).subscribe((newHeroWithId) => {
      this.registrationresponse = newHeroWithId;
      if ( this.registrationresponse.status) {
        this.auth.showSnackBar('Account verified succefully ');
        this.status = true;
        this.router.navigate(['/login']);
      }
      console.log(this.registrationresponse.status);
    }, (response: Response) => {
      if (response.status <= 500) {
        this.status = true;
        this.auth.showSnackBar('Wrong verification code ');
        this.error = 'Wrong verification code';
      }
    });
  }  resendz(resend: Resender): void {
    this.error = null;
    this.resenderservice.resend(resend).subscribe((newHeroWithId) => {
      this.registrationresponse = newHeroWithId;
      if ( this.registrationresponse.status) {
        this.auth.showSnackBar('Verification code sent succefully ,check your phone');
        this.status = true;
      }
      console.log(this.registrationresponse.status);
    }, (response: Response) => {
      if (response.status <= 500) {
        this.status = true;
        this.auth.showSnackBar('Check your Phone number ');
        this.error = 'Check your Phone number';
      }
    });
  }
  setStep(index: number) {
    this.step = index;
  }
}
