import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import {DataService} from '../services/data.service';
import {CrudService} from '../services/crud.service';
import {User} from "../model/User";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public values: any[];
  user: user;
  private formSubmitAttempt: boolean;
  constructor(    private fb: FormBuilder, private authService: AuthService ,
                  vcr: ViewContainerRef , private dataService: DataService, private crudeService: CrudService) {
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
      this.authService.login(this.form.value);
    }
    this.formSubmitAttempt = true;
  }
  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
       this.crudeService.save(user);
      // console.log(this.userAccount);
      this.this.crudeService.save(user).subscribe(
        data => this.user = data)

      if (this.user) {
        this.loggedIn.next(true);
        this.router.navigate(['/dashboard']);
      }
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
