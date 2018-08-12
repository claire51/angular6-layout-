import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import {KevolService} from '../services/kevol.service';
import {User} from '../model/User';
import {UseAccounts} from '../model/Accounts';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public values: any[];
  user: User;
  useAccounts: Array<UseAccounts>;
  private formSubmitAttempt: boolean;
  constructor(    private fb: FormBuilder, private authService: AuthService ,
                  vcr: ViewContainerRef , private kevolService: KevolService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
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
      this.login(this.form.value);
    }
    this.formSubmitAttempt = true;
  }
  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      this.kevolService.getdata().subscribe(
      useAccounts => this.useAccounts = useAccounts);
    }
  }


// FindAllUser() {
//   this.dataService
//     .getAll<any[]>()
//     .subscribe((data: any[]) => this.values = data,
//       error => () => {
//      console.log('something went wrong');
//       },
//       () => {
//         console.log('success');
//       });
//
// }

}
