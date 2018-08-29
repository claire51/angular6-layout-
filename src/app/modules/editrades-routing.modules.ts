import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EdittradeComponent} from '../Component/edittrade/edittrade.component';



const routes: Routes = [
  { path: '',
    component: EdittradeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EditradesRoutingModules { }
