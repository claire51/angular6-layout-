import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup,  Validators } from '@angular/forms';
import {MatTabChangeEvent} from '@angular/material';
import {TradeRole} from '../../model/TradeRole';
import {TradeParty} from '../../model/TradeParty';
import {Transactions} from '../../model/Transactions';
import {Delivery} from '../../model/Delivery';
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

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  tradevalueedit: Tradevalueedit = new Tradevalueedit();
  traderolelist: Array<TradeRole> = new Array<TradeRole>();
  tradeparty: TradeParty = new TradeParty();
  traderole: TradeRole = new TradeRole() ;
  transaction: Transactions = new Transactions();
  transactionresp: Transactions = new Transactions();
  delivery: Delivery = new Delivery();
  item: Item = new Item();
  itemlist: Array<Item> = new Array<Item>();
  deliverylist: Array<Delivery> = new Array<Delivery>();
  constructor(public auth: AuthService , private _formBuilder: FormBuilder,
              private transactionseditservice: Transactionedit, private itemservices: ItemeditServices, private router: Router) { }

  ngOnInit() {
    this.getransactiondata();
    this.firstFormGroup = this._formBuilder.group({
      id: ['' , Validators.required],
      period: ['', Validators.required],
      invoice_amount: ['' ],
      inspection_period: [''],
      agent_fee_value: [''],
      agent_fee_type_id: ['1'],
      fee_allocation_id: ['1'],
      classification_id: ['1'],
    });
    this.secondFormGroup = this._formBuilder.group({
      id: ['' ],
      name: ['' ],
      description: ['' ],
      quantity: ['' ],
      unit_of_measures_id: ['' ]
    });
  }
  getransactiondata() {
    this.transaction = this.auth.transactionshelper;
    this.item = this.transaction.items[0];
    this.firstFormGroup.setValue({
      id: this.transaction.id,
      period: this.transaction.period,
      agent_fee_value: this.transaction.agent_fee_value,
      inspection_period: this.transaction.inspection_period,
      agent_fee_type_id: this.transaction.agent_fee_type_id,
      classification_id: this.transaction.classification_id
    });

    this.secondFormGroup.setValue({
      id: this.item .id,
      name: this.item .name,
      description: this.item.description ,
      quantity: this.item.quantity,
      unit_of_measures_id: this.item.unit_of_measures_id,
    });


  }
  onSubmit() {
    if (this.firstFormGroup.valid) {
      this.submittradevalueedit(this.firstFormGroup.value);
    }
  }

  onSubmitform() {
    if (this.secondFormGroup.valid) {
      this.submittradeitemedit(this.secondFormGroup.value);
    }
  }

  submittradevalueedit(tradevaluedit: Tradevalueedit) {
    if (tradevaluedit.invoice_amount !== 0 && tradevaluedit.id !== 0 ) {
      this.transactionseditservice.updateData(this.tradevalueedit).subscribe((transaresp) => {
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
    if (this.item.quantity !== 0 && this.item.id !== 0 ) {
      this.itemservices.updateData(this.item).subscribe((transaresp) => {
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
