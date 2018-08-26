import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { PassRecoverComponent } from '../Component/pass-recover/pass-recover.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {Recoverpassword} from '../localService/recoverpassword';
@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  providers: [
    Recoverpassword
  ],
  declarations: [
    PassRecoverComponent,
    ]
})
export class SharedModule { }
