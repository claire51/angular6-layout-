import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MatTabChangeEvent} from '@angular/material';
@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent  implements  OnInit {
  selected: number;
  selectedb = new FormControl(0);
  role: string;
  constructor() {
    this.role = 'buyer';
    this.selected = 0;
  }
  ngOnInit() {
    if (this.role === 'buyer') {
      console.log('buyerfucker');
    }

    if (this.role === 'seller') {
      console.log('seller');
    }
    if (this.role === 'agent') {
      console.log('agent');
    }
  }
 next() {
   this.selected = this.selectedb.value + 1;
 }
  previous() {
    if (this.selected > 0 ) {
      this.selected = this.selectedb.value - 1;
    }
  }
  statuz() {
    console.log('greeat');
  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.selectedb.setValue(tabChangeEvent);
  }
  }
