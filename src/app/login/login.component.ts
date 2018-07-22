import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import {DataService} from '../services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public values: any[];
  private formSubmitAttempt: boolean;
  constructor(    private fb: FormBuilder, private authService: AuthService ,
                  vcr: ViewContainerRef , private dataService: DataService) {
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

FindAllUser() {
  this.dataService
    .getAll<any[]>()
    .subscribe((data: any[]) => this.values = data,
      error => () => {
     console.log('something went wrong');
      },
      () => {
        console.log('success');
      });

}

}
