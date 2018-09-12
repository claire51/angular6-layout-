import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ResetpasswordComponent} from '../Component/resetpassword/resetpassword.component';

const routes: Routes = [
  { path: '',
    component: ResetpasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetpassRouting { }
