import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PaymentRouting} from './payment-routing';
import {PaymentComponent} from '../Component/payment/payment.component';
import {Transactionview} from '../localService/transactionview';
import {PaymentService} from '../localService/payment.service';

@NgModule({
  imports: [
    CommonModule,
    PaymentRouting,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  providers: [Transactionview, PaymentService
  ],
  declarations: [
    PaymentComponent,
  ]
})
export class PaymentModule { }
