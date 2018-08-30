import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CreatetradeRoutingModule} from './createtrade--routing.module';
import {CreatetradeComponent} from '../Component/createtrade/createtrade.component';
import {Transactionview} from '../localService/transactionview';

@NgModule({
  imports: [
    CommonModule,
    CreatetradeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  declarations: [CreatetradeComponent],

  providers: [
    Transactionview
  ],
})
export class CreatetradeModule { }
