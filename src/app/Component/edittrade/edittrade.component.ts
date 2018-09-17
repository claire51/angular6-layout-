import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import {MatTabChangeEvent} from '@angular/material';
import {Transactions} from '../../model/Transactions';
import {Item} from '../../model/Items';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {Tradevalueedit} from '../../model/Tradevalueedit';
import {Transactionedit} from '../../localService/transactionedit';
import {ItemeditServices} from '../../localService/itemedit.services';

@Component({
  selector: 'app-edittrade',
  templateUrl: './edittrade.component.html',
  styleUrls: ['./edittrade.component.scss']
})
export class EdittradeComponent implements OnInit {
  selected: number;
  selectedb = new FormControl(0);

  firstFormGroupA: FormGroup;
  secondFormGroupB: FormGroup;
  status: boolean;
  iseditable: boolean;
  statusvalue: number;
  private formSubmitAttempt: boolean;

  transaction: Transactions = new Transactions();
  item: Item = new Item();
  constructor(public auth: AuthService , private _formBuilder: FormBuilder,
              private transactionseditservice: Transactionedit, private itemservices: ItemeditServices, private router: Router) { }

  ngOnInit() {
    this.transaction = this.auth.transactionshelper;
    this.item = this.transaction.items[0];
    this.statusvalue = this.transaction.status.id;
    if (this.statusvalue === 1) {
      this.iseditable = false;
    } else {
      this.iseditable = true;
    }
    this.firstFormGroupA = this._formBuilder.group({
      id: [this.transaction.id],
      period: [this.transaction.period, Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      invoice_amount: [this.transaction.invoice_amount, Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      inspection_period: [this.transaction.inspection_period, Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      agent_fee_value: [0, Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      agent_fee_type_id: [this.transaction.agent_fee_type_id, Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      fee_allocation_id: [this.transaction.fee_allocation_id, Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      classification_id: [ this.transaction.classification_id, Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
    });
    this.secondFormGroupB = this._formBuilder.group({
      id: [this.item.id],
      name: [this.item.name, Validators.pattern(/[A-Za-z]/)],
      description: [this.item.description, Validators.pattern(/[A-Za-z]/)],
      quantity: [this.item.quantity, Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      unit_of_measures_id: [this.item.unit_of_measures_id, Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
    });
  }
  isFieldInvalid(field: string) {
    return (
      (!this.firstFormGroupA.get(field).valid && this.firstFormGroupA.get(field).touched) ||
      (this.firstFormGroupA.get(field).untouched && this.formSubmitAttempt)
    );
  }
  isFieldInvalidB(field: string) {
    return (
      (!this.secondFormGroupB.get(field).valid && this.secondFormGroupB.get(field).touched) ||
      (this.secondFormGroupB.get(field).untouched && this.secondFormGroupB)
    );
  }
  onSubmit() {
    if (this.firstFormGroupA.valid) {
      this.submittradevalueedit(this.firstFormGroupA.value);
    }
    this.formSubmitAttempt = true;
  }

  onSubmitform() {
    if (this.secondFormGroupB.valid) {
      this.submittradeitemedit(this.secondFormGroupB.value);
    }
    this.formSubmitAttempt = true;
  }

  submittradevalueedit(tradevaluedit: Tradevalueedit) {
    if (tradevaluedit.invoice_amount !== 0 && tradevaluedit.id !== 0 ) {
      this.transactionseditservice.updateData(tradevaluedit).subscribe((transaresp) => {
          this.auth.transactionshelper = transaresp;
          this.transaction = transaresp;
          if (this.transaction.id > 0) {
            console.log(this.transaction.id);
            this.auth.showSnackBar(' Transaction' + this.transaction.transaction_code + 'updated Succefully ');
            // this.router.navigate(['/viewtrade']);
          }
        },
        (response: Response) => {
          if (response.status <= 500) {
            this.auth.showSnackBar(' ooops! Something  wrong happenned');
          }
        });
    }
  }

  submittradeitemedit(item: Item) {
    if (this.item.quantity > 0 && this.item.id > 0 ) {
      this.itemservices.updateData(item).subscribe((transaresp) => {
          this.auth.transactionshelper = transaresp;
          this.transaction = transaresp;
          if (this.transaction.id > 0) {
            console.log(this.transaction.id);
            this.auth.showSnackBar(' Transaction' + this.transaction.transaction_code + ' Item updated Succefully ');
            // this.router.navigate(['/viewtrade']);
          }
        },
        (response: Response) => {
          if (response.status <= 500) {
            this.auth.showSnackBar(' ooops! Something  wrong happenned');
          }
        });
    }

  }











  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.selectedb.setValue(tabChangeEvent);

  }
  next() {
    this.selected = this.selectedb.value + 1;
  }

  previous() {
    if (this.selected > 0 ) {
      this.selected = this.selectedb.value - 1;
    }
  }
}
