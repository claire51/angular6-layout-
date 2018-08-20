import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppMaterialModule} from '../app-material/app-material.module';
import {RoleboardComponent} from './roleboard/roleboard.component';
import {RoleboardRoutingModule} from './roleboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RoleboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FlexLayoutModule
  ],
  declarations: [RoleboardComponent]
})
export class RoleboardModule { }
