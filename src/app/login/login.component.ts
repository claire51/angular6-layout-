import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Login} from '../localService/login';
import {Authrizer} from '../model/authrizer';
import {Tokens} from '../model/Tokens';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {AppConfig} from '../common/config/app.config';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {ProgressBarService} from '../services/progress-bar.service';
import {User} from '../model/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public values: any[];
  tokens: Tokens;
  error: string;
  color = 'primary';
  status: boolean;
  kevol: string;
  private formSubmitAttempt: boolean;
  constructor(private fb: FormBuilder, private loginservice: Login, private authservice: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.status = true;
    this.authservice.showloading = false;
    this.form = this.fb.group({
      email: ['', Validators.required, Validators.email],
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
      this.status = false;
      this.kevol = this.form.value.email;
      console.log(this.kevol);
      this.login(this.form.value);
    }
    this.formSubmitAttempt = true;
  }
  login(auther: Authrizer) {
    if (auther.email !== '' && auther.password !== '' ) {
      this.error = null;
      this.loginservice.authrize(auther).subscribe((newHeroWithId) => {
        this.tokens = newHeroWithId;
        if ( this.tokens.status) {
          localStorage.setItem('token', this.tokens.token);
          localStorage.setItem('expires_in', '' + (Number(0) + this.tokens.expires_in));
          localStorage.setItem('email', '' + (this.tokens.user.email));
          localStorage.setItem('phone_number', '' + (this.tokens.user.phone_number));
          localStorage.setItem('firstname', '' + (this.tokens.user.first_name));
          localStorage.setItem('lastname', '' + (this.tokens.user.last_name));
          localStorage.setItem('idnumber', '' + (this.tokens.user.id_number));
          localStorage.setItem('county', '' + (this.tokens.user.county));
          localStorage.setItem('id', '' + (this.tokens.user.id));
console.log((Number(localStorage.getItem('id'))));
          this.authservice.login();
          this.status = true;
          this.router.navigate(['/dashboard']);
        }
      }, (response: Response) => {
        if (response.status <= 500) {
          this.status = true;
          this.authservice.showSnackBar(' Invalid Password or Username');
          this.error = 'Invalid Password or Username';
        }
      });
    }
  }




}
