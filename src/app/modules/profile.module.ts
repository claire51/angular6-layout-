import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProfileRouting} from './profile-routing';
import {EdituserComponent} from '../Component/edituser/edituser.component';
import {ResetpasswordService} from '../localService/resetpassword.service';
import {UsereditService} from '../localService/useredit.service';
@NgModule({
  imports: [
    CommonModule,
    ProfileRouting,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  providers: [
    ResetpasswordService,
    UsereditService

],
  declarations: [
    EdituserComponent,
]
})
export class ProfileModule { }
