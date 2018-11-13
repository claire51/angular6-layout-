import { Component, OnInit } from '@angular/core';
import {ProgressBarService} from '../services/progress-bar.service';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CalculatorfeeService} from '../localService/calculatorfee.service';
import {Charges} from '../model/Charges';
import {IImage} from 'ng-simple-slideshow';
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


  imageUrls: (string | IImage)[] = [
    { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg', caption: 'The first slide', href: '#config' },
    { url: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg', clickAction: () => alert('custom click function') },
    { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56789263/akrales_170919_1976_0104.0.jpg', caption: 'Apple TV', href: 'https://www.apple.com/' },
    { url:  'https://cdn.vox-cdn.com/uploads/chorus_image/image/56674755/mr_pb_is_the_best.0.jpg', caption: 'Apple TV', href: 'https://www.apple.com/' }
  ];
  height: string = '400px';
  minHeight: string;
  arrowSize: string = '30px';
  showArrows: boolean = true;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 3333;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = 'cover';
  backgroundPosition: string = 'center center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = true;
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = false;
  hideOnNoSlides: boolean = false;
  width: string = '100%';





  constructor(private progressBarService: ProgressBarService,
            private authservice: AuthService , private calcservice: CalculatorfeeService, private formBuilder: FormBuilder) {
  this.feeamount = 0;
  this.reqAmount = 0;
  this.status = false;
}

  ngOnInit() {
    this.authservice.showloading = true;
    this.form = this.formBuilder.group({
      amount: [0,  Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ]
    });
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
  }
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
      if (this.reqAmount > 0) {
        if ( this.chargesz.length < 1) {
        this.calcservice.getdata().subscribe((newHeroWithId) => {
          this.chargesz = newHeroWithId;
            this.status = true;
          for (let item of this.chargesz) {
            if ( item.lower_limit <= this.reqAmount && this.reqAmount < item.higher_limit) {
             this.feeamount = item.percentage / 100 * this.reqAmount + item.flat_amount;
            }
          }
          this.authservice.showSnackBar('Fee charged is: Ksh ' + this.feeamount);

        }, (response: Response) => {
          if (response.status <= 500) {
            this.status = true;
            this.authservice.showSnackBar('ooops something went wrong  ');
          }
        });
      } else {
        for (let item of this.chargesz) {
          if ( item.lower_limit <= this.reqAmount && this.reqAmount < item.higher_limit) {
            this.feeamount = item.percentage / 100 * this.reqAmount + item.flat_amount;
          }
        }
        this.authservice.showSnackBar('Fee charged is: Ksh ' + this.feeamount);
      }
      } else {
        this.feeamount = 0;
      }

  }

  // carousel

}
