import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Login} from '../localService/login';
import {Authrizer} from '../model/authrizer';
import {Tokens} from '../model/Tokens';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {User} from '../model/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  tokens: Tokens;
  error: string;
  color = 'primary';
  status: boolean;
  users: User = new User();
  private formSubmitAttempt: boolean;
  constructor(private fb: FormBuilder, private loginservice: Login, private authservice: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.status = true;
    this.authservice.showloading = false;
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email]) ],
      password: ['', Validators.compose([ Validators.required, Validators.minLength(3)])],
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
          this.authservice.login();
          this.authservice.verified = this.tokens.user.phone_verified;
          this.authservice.hasotp = this.tokens.user.has_otp;
          this.status = true;
          if (this.authservice.verified === 0 ) {
            this.router.navigate(['/verify']);
          } else {
            if ( this.authservice.hasotp === 0 ) {
          this.router.navigate(['/dashboard']);
            } else {
              this.authservice.otpmessage = 'You have one time password please update with password of choice';
              this.router.navigate(['/profile']);
            }
        }
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
