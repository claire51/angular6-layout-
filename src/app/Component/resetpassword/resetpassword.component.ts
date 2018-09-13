import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RecoverPassword} from '../../model/RecoverPassword';
import {ErrorStateMatcher} from '@angular/material';
import {Recoverpass} from '../../model/recoverpass';
import {RecoverPassService} from '../../localService/recoverPass.service';
import {RegistrationResponse} from '../../model/registrationResponse';
import {AuthService} from '../../auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  error: string;
  resetPassword: FormGroup;
  registrationresponse: RegistrationResponse;
  status: boolean;
  step: number;
  tokenz: string;
  private formSubmitAttempt: boolean;
  isLoggedIn$: Observable<boolean>;
  matcher = new MyErrorStateMatcher();
 recoverpass: Recoverpass = new Recoverpass();
  constructor(private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute, private recoverpasservice: RecoverPassService, public auth: AuthService) { this.step = 1}

  ngOnInit() {
    this.tokenz =  this.route.snapshot.params['token'];
    console.log(this.tokenz)
    this.resetPassword = this.fb.group({
      email: ['', Validators.required],
      newpass: ['', Validators.required],
      confirmpass: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.newpass.value;
    let confirmPass = group.controls.confirmpass.value;

    return pass === confirmPass ? null : { notSame: true };
  }
  setStep(index: number) {
    this.step = index;
  }
  isFieldInvalid(field: string) {
    return (
      (!this.resetPassword.get(field).valid && this.resetPassword.get(field).touched) ||
      (this.resetPassword.get(field).untouched && this.formSubmitAttempt)
    );
  }
  onSubmitformb() {
    if (this.resetPassword.value.newpass !== '' && this.resetPassword.value.newpass != null) {
      this.status = false;
      this.recoverpass.token = this.tokenz;
      this.recoverpass.email = this.resetPassword.value.email;
      this.recoverpass.password = this.resetPassword.value.newpass;
      this.recoverpass.password_confirmation = this.resetPassword.value.newpass;
      this.resetpass(this.recoverpass);
    }
    this.formSubmitAttempt = true;
  }

  resetpass(recoverpassword: Recoverpass): void {
    this.recoverpasservice.recoverpassword(recoverpassword).subscribe((newHeroWithId) => {
      this.registrationresponse = newHeroWithId;
      if ( this.registrationresponse.status) {
        this.auth.showSnackBar('Password was succesfully changed  .. continue to login');
        this.status = true;
        this.router.navigate(['/login']);
      }
      this.status = true;
    }, (response: Response) => {
      if (response.status <= 500) {
        this.status = true;
        this.auth.showSnackBar('Error occured Try again ');
      }
    });
  }
}
