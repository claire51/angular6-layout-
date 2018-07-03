import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { LoginComponent } from './login/login.component';
import { MyTableComponent } from './my-table/my-table.component';


const routes: Routes = [

  { path: 'dashboard', component: MyDashboardComponent, canActivate: [AuthGuardGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'datatable', component: MyTableComponent },
  { path: 'profile',
    loadChildren: '../app/profile/profile.module#ProfileModule'
  },
  { path: '**', redirectTo: ''},
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full' , canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
