import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CreatetradeComponent} from '../Component/createtrade/createtrade.component';

const routes: Routes = [
  { path: '',
    component: CreatetradeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatetradeRoutingModule { }
