import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PaymentComponent} from '../Component/payment/payment.component';

const routes: Routes = [
  { path: '',
    component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRouting { }
