import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ResetpasswordComponent} from '../Component/resetpassword/resetpassword.component';
import {ResetpassRouting} from './resetpass-routing';
import {RecoverPassService} from '../localService/recoverPass.service';

@NgModule({
  imports: [
    CommonModule,
    ResetpassRouting,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  providers: [
    RecoverPassService
  ],
  declarations: [
    ResetpasswordComponent,
  ]
})
export class ResetpassModule { }
