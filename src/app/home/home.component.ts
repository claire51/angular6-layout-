import { Component, OnInit } from '@angular/core';
import {ProgressBarService} from '../services/progress-bar.service';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CalculatorfeeService} from "../localService/calculatorfee.service";
import {Charges} from "../model/Charges";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  progressBarMode: string;
  feeamount: number;
  reqAmount: number;
  form: FormGroup;
  error: string;
  status: boolean;
  chargesz: Array<Charges> = new Array<Charges>();
  private formSubmitAttempt: boolean;
constructor(private progressBarService: ProgressBarService,
            private authservice: AuthService , private calcservice: CalculatorfeeService, private formBuilder: FormBuilder) {
  this.feeamount = 0;
}

  ngOnInit() {
    this.authservice.showloading = true;
    this.form = this.formBuilder.group({
      amount: [0, Validators.required]
    });
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.reqAmount = this.form.value.amount;
      this.status = false;
      if ( this.reqAmount > 0) {
        if ( this.chargesz.length < 1) {
        this.calcservice.getdata().subscribe((newHeroWithId) => {
          this.chargesz = newHeroWithId;
            this.status = true;
          console.log('ooooo');
        }, (response: Response) => {
          if (response.status <= 500) {
            this.status = true;
            this.authservice.showSnackBar('ooops something went wrong  ');
          }
        });
      }
        this.authservice.showSnackBar('Your fee is ');
      }
    }
    this.formSubmitAttempt = true;
  }



}
