import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { MyTableComponent } from './my-table/my-table.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import {ApitestComponent} from './apitest/apitest.component';

const routes: Routes = [


  { path: 'login', component: LoginComponent },
  { path: 'datatable', component: MyTableComponent , canActivate: [AuthGuardGuard] },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'apicontent', component: ApitestComponent , canActivate: [AuthGuardGuard]},
  { path: 'dashboard',
    loadChildren: '../app/modules/dashboard.module#DashboardModule' , canActivate: [AuthGuardGuard]
  },
  { path: 'recover',
    loadChildren: '../app/modules/shared.module#SharedModule'
  },
  { path: 'createtrade',
    loadChildren: '../app/modules/createtrade.module#CreatetradeModule' , canActivate: [AuthGuardGuard]
  },
  { path: 'viewtrade/:id',
    loadChildren: '../app/modules/viewtrades.module#ViewtradesModule' , canActivate: [AuthGuardGuard]
  }, { path: 'editrade',
    loadChildren: '../app/modules/editrades.module#EditradesModule' , canActivate: [AuthGuardGuard]
  }, { path: 'profile',
    loadChildren: '../app/modules/profile.module#ProfileModule' , canActivate: [AuthGuardGuard]
  }, { path: 'fund',
    loadChildren: '../app/modules/payment.module#PaymentModule' , canActivate: [AuthGuardGuard]
  }, { path: 'viewpayment',
    loadChildren: '../app/modules/viewpayment.module#ViewpaymentModule' , canActivate: [AuthGuardGuard]
  },
  { path: '**', redirectTo: '' },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full' , canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
