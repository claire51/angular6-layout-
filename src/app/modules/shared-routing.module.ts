import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PassRecoverComponent} from '../Component/pass-recover/pass-recover.component';

const routes: Routes = [
  { path: '',
  component: PassRecoverComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
