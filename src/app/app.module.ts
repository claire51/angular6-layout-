import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { AuthService } from './auth.service';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { MyTableComponent } from './my-table/my-table.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import {Configuration} from './app.constants';
import { ApitestComponent } from './apitest/apitest.component';
import {KevolService} from './services/kevol.service';
import {RegisterService} from './localService/register.service';

@NgModule({
  declarations: [
    AppComponent,
    MyDashboardComponent,
    MyTableComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ApitestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    AppMaterialModule,
   FormsModule ,
    ReactiveFormsModule,
    LayoutModule,

    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthGuardGuard, AuthService, Configuration, KevolService, RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
