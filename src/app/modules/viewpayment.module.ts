import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ViewpaymentComponent} from '../Component/viewpayment/viewpayment.component';
import {ViewpaymentRouting} from './viewpayment-routing';
import {ViewpaymentService} from '../localService/viewpayment.service';

@NgModule({
  imports: [
    CommonModule,
    ViewpaymentRouting,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  providers: [
    ViewpaymentService
  ],
  declarations:[ ViewpaymentComponent
  ]
})
export class ViewpaymentModule { }
