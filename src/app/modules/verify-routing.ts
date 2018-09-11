import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {VerifyComponent} from '../Component/verify/verify.component';

const routes: Routes = [
  { path: '',
    component: VerifyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyRouting { }
