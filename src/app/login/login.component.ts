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
  private formSubmitAttempt: boolean;
  constructor(private fb: FormBuilder, private loginservice: Login, private authservice: AuthService,
              private router: Router,  private snackBar: MatSnackBar, private progressBarService: ProgressBarService) {
  }

  ngOnInit() {
    this.status = true;
    this.authservice.showloading = false;
    this.form = this.fb.group({
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
      this.status = false;
      this.login(this.form.value);
    }
    this.formSubmitAttempt = true;
  }
  login(auther: Authrizer) {
    if (auther.email !== '' && auther.password !== '' ) {
      this.error = null;
      this.loginservice.authrize(auther).subscribe((newHeroWithId) => {
        this.tokens = newHeroWithId;
        if ( this.tokens.status === 'ok') {
          localStorage.setItem('token', this.tokens.token);
          localStorage.setItem('expires_in', '' + (Number(0) + this.tokens.expires_in));
          this.authservice.login();
          this.status = true;
          this.router.navigate(['/dashboard']);
        }
      }, (response: Response) => {
        if (response.status <= 500) {
          this.status = true;
          this.showSnackBar(' Invalid Password or Username');
          this.error = 'Invalid Password or Username';
        }
      });
    }
  }
    showSnackBar(name): void {
      const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(name, 'OK', config);
  }




}
