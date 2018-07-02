import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { LoginComponent } from './login/login.component';
import { MyTableComponent } from './my-table/my-table.component';


const routes: Routes = [

  { path: 'dashboard', component: MyDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'datatable', component: MyTableComponent },
  { path: 'profile',
    loadChildren: '../app/profile/profile.module#ProfileModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
