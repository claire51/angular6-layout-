import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {VerifyComponent} from '../Component/verify/verify.component';
import {VerifyRouting} from './verify-routing';
import {VerifyerService} from '../localService/verifyer.service';
import {ResenderService} from '../localService/resender.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VerifyRouting,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  providers: [
    VerifyerService,
    ResenderService

  ],
  declarations: [
    VerifyComponent,
  ]
})
export class VerifyModule { }
