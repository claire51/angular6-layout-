import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecoverPassword} from '../../model/RecoverPassword';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Router} from '@angular/router';
import {AppConfig} from '../../common/config/app.config';
import {RegistrationResponse} from '../../model/registrationResponse';
import {Recoverpassword} from '../../localService/recoverpassword';

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
  private formSubmitAttempt: boolean;
  constructor(private fb: FormBuilder, private router: Router,
              private snackBar: MatSnackBar, private recoverservice: Recoverpassword) { }

  ngOnInit() {
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
      this.requestpass(this.form.value);
    }
    this.formSubmitAttempt = true;
  }
 requestpass(recoverpassword: RecoverPassword): void {
    this.error = null;
    this.recoverservice.recover(recoverpassword).subscribe((newHeroWithId) => {
      this.registrationresponse = newHeroWithId;
      if ( this.registrationresponse.status === 'ok') {
        this.showSnackBar('Check your Email we have sent the password ');
        this.router.navigate(['/login']);
      }
      console.log(this.registrationresponse.status);
    }, (response: Response) => {
      if (response.status <= 500) {
        this.showSnackBar('Account with that Email does not Exist ');
        this.error = 'account with that email does not exist';
      }
    });
  }
  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(name, 'OK', config);
  }
}

