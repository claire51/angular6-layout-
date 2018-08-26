import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ViewtradeComponent} from '../Component/viewtrade/viewtrade.component';

const routes: Routes = [
  { path: '',
    component: ViewtradeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewtradesRoutingModule { }
