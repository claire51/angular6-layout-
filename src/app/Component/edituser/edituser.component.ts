import {Component, OnInit} from '@angular/core';
import {RecoverPassword} from '../../model/RecoverPassword';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ResetpasswordService} from '../../localService/resetpassword.service';
import {RegistrationResponse} from '../../model/registrationResponse';
import {AuthService} from '../../auth.service';
import {ErrorStateMatcher} from '@angular/material';
import {UsereditService} from '../../localService/useredit.service';
import {User} from '../../model/User';
import {Useredit} from '../../model/Useredit';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  phone_number: string;
  resetPassword: FormGroup;
  usereditform: FormGroup;
  email: string;
  firstname: string;
  otpmessage: string;
  fullname: string;
  lastname: string;
  idnumber: string;
  county: string;
  id: string;
  step: number;
  stepper: number;
  registrationresponse: RegistrationResponse;
  useresponse: User;
  status: boolean;
  recoverpass: RecoverPassword = new RecoverPassword();
  matcher = new MyErrorStateMatcher();
  private formSubmitAttempt: boolean;

  constructor(private fb: FormBuilder, private resetpasswordservice: ResetpasswordService, private usereditservice: UsereditService,
              public auth: AuthService) {
    this.email = localStorage.getItem('email');
    this.fullname = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname');
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');
    this.idnumber = localStorage.getItem('idnumber');
    this.county = localStorage.getItem('county');
    this.id = localStorage.getItem('id');
    this.step = 1;
    this.stepper = 1;
    this.otpmessage = this.auth.otpmessage;
  }

  ngOnInit() {
    this.otpmessage = this.auth.otpmessage;
    this.resetPassword = this.fb.group({
      currentpass: ['',  Validators.compose([Validators.required, Validators.email]) ],
      newpass: ['', Validators.compose([ Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_.-]*$/)])],
      confirmpass: ['', Validators.required]
    }, {validator: this.checkPasswords});
    this.usereditform = this.fb.group({
      id: [(Number(localStorage.getItem('id')))],
      first_name: [localStorage.getItem('firstname'), Validators.compose([ Validators.required, Validators.minLength(3), Validators.pattern(/[A-Za-z]/)])],
      phone_number: [localStorage.getItem('phone_number'), Validators.compose([Validators.required, Validators.pattern(/^07\d{8}$/)]) ],
      national_id: [localStorage.getItem('idnumber'), Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      email: [localStorage.getItem('email'), Validators.compose([Validators.required, Validators.email]) ]
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.newpass.value;
    let confirmPass = group.controls.confirmpass.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  setStep(index: number) {
    this.step = index;
  }

  setStepper(index: number) {
    this.stepper = index;
  }

  isFieldInvalid(field: string) {
    return (
      (!this.resetPassword.get(field).valid && this.resetPassword.get(field).touched) ||
      (this.resetPassword.get(field).untouched && this.formSubmitAttempt)
    );
  }

  isFieldInvalidb(field: string) {
    return (
      (!this.usereditform.get(field).valid && this.usereditform.get(field).touched) ||
      (this.usereditform.get(field).untouched && this.usereditform)
    );
  }

  onSubmitformb() {
    if (this.resetPassword.value.newpass !== '' && this.resetPassword.value.newpass != null) {
      this.status = false;
      this.recoverpass.password = this.resetPassword.value.newpass;
      this.resetpass(this.recoverpass);
    }
    this.formSubmitAttempt = true;
  }

  onSubmitformuser() {
    if (this.usereditform.valid) {
      this.status = false;
      this.edituserdetail(this.usereditform.value);
    }
    this.formSubmitAttempt = true;
  }

  resetpass(recoverpassword: RecoverPassword): void {
    this.resetpasswordservice.changepass(recoverpassword).subscribe((newHeroWithId) => {
      this.registrationresponse = newHeroWithId;
      if (this.registrationresponse.status) {
        this.auth.showSnackBar('Password was succesfully changed ');
        this.status = true;
      }
      this.status = true;
    }, (response: Response) => {
      if (response.status <= 500) {
        this.status = true;
        this.auth.showSnackBar('Error occured Try again ');
      }
    });
  }

  edituserdetail(useredit: Useredit): void {
    this.usereditservice.updateuser(useredit).subscribe((newHeroWithId) => {
      this.useresponse = newHeroWithId;
      if (this.useresponse.id) {
        this.auth.showSnackBar('user detail was succesfully updated ');
        localStorage.setItem('email', '' + (this.useresponse.email));
        localStorage.setItem('phone_number', '' + (this.useresponse.phone_number));
        localStorage.setItem('firstname', '' + (this.useresponse.first_name));
        localStorage.setItem('idnumber', '' + (this.useresponse.id_number));
        this.status = true;

        this.phone_number = localStorage.getItem('phone_number');
        this.email = localStorage.getItem('email');
        this.fullname = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname');
      } else {
        this.status = true;
        this.auth.showSnackBar('oooops something bad happenned Try again ');
      }
    }, (response: Response) => {
      if (response.status <= 500) {
        this.status = true;
        this.auth.showSnackBar('oooops something bad happenned Try again ');
      }
    });
  }
}
