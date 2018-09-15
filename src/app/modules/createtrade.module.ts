import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CreatetradeRoutingModule} from './createtrade--routing.module';
import {CreatetradeComponent} from '../Component/createtrade/createtrade.component';
import {Transactionservc} from '../localService/transactionservc';
import {CalculatorfeeService} from '../localService/calculatorfee.service';
import {FeeallocationService} from '../localService/feeallocation.service';
import {ClassificationService} from '../localService/classification.service';

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
    Transactionservc, CalculatorfeeService, FeeallocationService, ClassificationService
  ],
})
export class CreatetradeModule { }
