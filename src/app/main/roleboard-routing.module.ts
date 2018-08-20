import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RoleboardComponent} from './roleboard/roleboard.component';

const routes: Routes = [
  { path: '',
    component: RoleboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleboardRoutingModule { }
