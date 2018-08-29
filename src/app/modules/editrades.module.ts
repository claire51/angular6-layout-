import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from '../app-material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EdittradeComponent} from '../Component/edittrade/edittrade.component';
import {EditradesRoutingModules} from './editrades-routing.modules';
import {Transactionedit} from '../localService/transactionedit';
import {ItemeditServices} from '../localService/itemedit.services';

@NgModule({
  imports: [
    CommonModule,
    EditradesRoutingModules,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  declarations: [EdittradeComponent],
  providers: [
    Transactionedit, ItemeditServices
  ],
})
export class EditradesModule { }
