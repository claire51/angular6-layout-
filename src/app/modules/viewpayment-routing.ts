import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ViewpaymentComponent} from '../Component/viewpayment/viewpayment.component';

const routes: Routes = [
  { path: '',
    component: ViewpaymentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewpaymentRouting { }
