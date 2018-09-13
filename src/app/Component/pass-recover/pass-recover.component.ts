import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecoverPassword} from '../../model/RecoverPassword';
import {Router} from '@angular/router';
import {RegistrationResponse} from '../../model/registrationResponse';
import {Recoverpassword} from '../../localService/recoverpassword';
import {Observable} from 'rxjs/index';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-pass-recover',
  templateUrl: './pass-recover.component.html',
  styleUrls: ['./pass-recover.component.scss']
})
export class PassRecoverComponent implements OnInit {
  form: FormGroup;
  public values: any[];
  registrationresponse: RegistrationResponse;
  error: string;
  status: boolean;
  private formSubmitAttempt: boolean;
  isLoggedIn$: Observable<boolean>;
  constructor(private fb: FormBuilder, private router: Router,
               private recoverservice: Recoverpassword, public auth: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isAuthenticated();
    this.status = true;
    this.form = this.fb.group({
      email: ['', Validators.required]
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
      this.status = false;
      this.requestpass(this.form.value);
    }
    this.formSubmitAttempt = true;
  }

 requestpass(recoverpassword: RecoverPassword): void {
    this.error = null;
    this.recoverservice.recover(recoverpassword).subscribe((newHeroWithId) => {
      this.registrationresponse = newHeroWithId;
      if ( this.registrationresponse.status) {
        this.auth.showSnackBar('Check your Email we have sent you the password ');
        this.status = true;
        this.router.navigate(['/login']);
      } else {
        this.auth.showSnackBar('Error occured Sending the email,  kindly check your email.. or contact support ');
      }
      this.status = true;
    }, (response: Response) => {
      this.status = true;
      if (response.status <= 500) {
        this.auth.showSnackBar('Error occured Sending the email,  kindly check your email.. or contact support ');
        this.error = 'Error occured Sending the email';
      }
    });
  }
}

