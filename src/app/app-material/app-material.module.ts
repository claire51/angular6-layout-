import { NgModule } from '@angular/core';

import {
  MatToolbarModule, MatDialogModule, MatButtonModule,
  MatSidenavModule, MatSelectModule, MatIconModule,
  MatListModule, MatInputModule, MatGridListModule, MatCardModule,
  MatMenuModule, MatTableModule, MatPaginatorModule,
  MatSortModule, MatFormFieldModule, MatBadgeModule, MatDividerModule,
  MatStepperModule, MatCheckboxModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatSliderModule, MatSnackBarModule, MatTooltipModule, MatTabsModule, MatButtonToggleModule,
  MatRadioModule
} from '@angular/material';



@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatBadgeModule,
    MatDividerModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRadioModule,

    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatButtonToggleModule
  ]
})
export class AppMaterialModule {}
