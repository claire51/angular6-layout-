import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ViewtradesRoutingModule} from './viewtrades-routing.module';
import {ViewtradeComponent} from '../Component/viewtrade/viewtrade.component';
import {Transactionview} from '../localService/transactionview';
import {PaymentService} from '../localService/payment.service';
import {ApproveService} from '../localService/approve.service';

@NgModule({
  imports: [
    CommonModule,
    ViewtradesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  declarations: [ViewtradeComponent],
  providers: [
    Transactionview, PaymentService, ApproveService
  ],
})
export class ViewtradesModule { }
