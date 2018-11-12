import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import {DashboardComponent} from './Component/dashboard/dashboard.component';

const routes: Routes = [


  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard] },

  { path: 'recover',
    loadChildren: '../app/modules/shared.module#SharedModule'
  },
  { path: 'createtrade',
    loadChildren: '../app/modules/createtrade.module#CreatetradeModule'
  }, { path: 'editrade',
    loadChildren: '../app/modules/editrades.module#EditradesModule' , canActivate: [AuthGuardGuard]
  }, { path: 'profile',
    loadChildren: '../app/modules/profile.module#ProfileModule' , canActivate: [AuthGuardGuard]
  },
  { path: 'verify',
    loadChildren: '../app/modules/verify.module#VerifyModule' , canActivate: [AuthGuardGuard]
  }, { path: 'reset_password/:token',
    loadChildren: '../app/modules/resetpass.module#ResetpassModule'
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
