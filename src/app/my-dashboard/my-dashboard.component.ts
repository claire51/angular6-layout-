import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {TradeParty} from '../model/TradeParty';
import {TradeRole} from '../model/TradeRole';
import {Transactions} from '../model/Transactions';
import {Delivery} from '../model/Delivery';
import {Item} from '../model/Items';
import {FeeAllocation} from '../model/FeeAllocation';
import {Classification} from '../model/Classification';
import {AgentFeeType} from '../model/AgentFeeType';
@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent  implements  OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  buyer = true;
  broker = false;
// model
  traderolelist: Array<TradeRole>;
  tradeparty: TradeParty;
  traderole: TradeRole;
  transaction: Transactions;
  delivery: Delivery;
  item: Item;
  itemlist: Array<Item>;
  deliverylist: Array<Delivery>;
  feeallocation: FeeAllocation;
  classification: Classification;
  agentfeetype: AgentFeeType;
  constructor( public auth: AuthService , private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      phone_number: ['' , Validators.required],
      full_names: ['', Validators.required],
      id_number: ['' ],
      email: [''],
      address: [''],
    });
    this.secondFormGroup = this._formBuilder.group({
      agent_mobl: [''],
      agent_email: [''],
      del_cntry: ['' , Validators.required],
      del_cnty: ['' , Validators.required],
      del_twn: ['' , Validators.required],
      del_strt: ['' , Validators.required],
      delivery_postal_code: ['' ],
      del_ln: [''],
      del_cmt: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      id: ['1'],
      name: ['', Validators.required],
      description: ['' , Validators.required],
      quantity: ['3' , Validators.required],
      unit_of_measures_id: ['1'],
      transactions_id: ['0']
    });
    this.fourthFormGroup = this._formBuilder.group({
      invoice_amount: ['', Validators.required],
      period: ['1' , Validators.required],
      inspection_period: ['1' , Validators.required],
      agent_fee_value: ['10']
    });
  }
  onsubmitformone() {
    if (this.firstFormGroup.valid) {
      this.tradeparty.id = 0;
      this.tradeparty.full_names = this.firstFormGroup.value.full_names;
      this.tradeparty.id_number = this.firstFormGroup.value.id_number;
      this.tradeparty.phone_number = this.firstFormGroup.value.phone_number;
      this.tradeparty.address = this.firstFormGroup.value.address;
      this.tradeparty.email = this.firstFormGroup.value.email;
      this.tradeparty.user_id = 0;
      if (this.buyer) {
        this.traderole.trading_party_id = 1;
      } else {  this.traderole.trading_party_id = 2; }

this.traderole.trade_party = this.tradeparty;
      this.traderolelist.length = 0;
      this.traderolelist.push(this.traderole);
      console.log(this.firstFormGroup.value.email);
    }
  }

  onsubmitformtwo() {
    this.delivery.id = 0;
    this.delivery.delivery_comment = this.secondFormGroup.value.del_cmt;
    this.delivery.delivery_postal_code = this.secondFormGroup.value.delivery_postal_code;
    this.delivery.delivery_lane = this.secondFormGroup.value.del_ln;
    this.delivery.delivery_street = this.secondFormGroup.value.del_strt;
    this.delivery.delivery_town = this.secondFormGroup.value.del_twn;
    this.delivery.delivery_county = this.secondFormGroup.value.del_cnty;
    this.delivery.delivery_country = this.secondFormGroup.value.del_cntry;
    this.deliverylist.push(this.delivery)
    if (this.broker) {
      this.addbroker(this.secondFormGroup.value.agent_mobl, this.secondFormGroup.value.agent_email);
    }

  }

  addbroker(phn, email) {
    this.tradeparty.id = 0;
    this.tradeparty.full_names = 'dddddd';
    this.tradeparty.id_number = '33333330';
    this.tradeparty.phone_number = phn;
    this.tradeparty.address = 'ggggggggggg';
    this.tradeparty.email = email;
    this.tradeparty.user_id = 0;
      this.traderole.trading_party_id = 3;

    this.traderole.trade_party = this.tradeparty;
    this.traderolelist.push(this.traderole);

  }
  onsubmitformthree() {
    if (this.firstFormGroup.valid) {
      this.item.name  = this.thirdFormGroup.value.name;
      this.item.description  = this.thirdFormGroup.value.description;
      this.item.quantity  = this.thirdFormGroup.value.quantity;
      this.item.unit_of_measures_id  = 0;
      this.itemlist.push(this.item);
    }

  }
  onsubmitformfourth() {
    if (this.firstFormGroup.valid) {
     this.transaction.invoice_amount = this.firstFormGroup.value.invoice_amount;
      this.transaction.period =  this.firstFormGroup.value.period;
      this.transaction.inspection_period = this.firstFormGroup.value.inspection_period;
      this.transaction.agent_fee_amount = this.firstFormGroup.value.agent_fee_value;
      this.transaction.agent_fee_type_id = 1;
    }
  }
  finishtransaction() {
  this.feeallocation.id = 1;
  this.classification.id = 1;
  if (this.broker) { this.agentfeetype.id = 0; }
  this.transaction.items = this.itemlist;
    this.transaction.trade_roles = this.traderolelist;
    // this.transaction.user = localStorage.getItem('user');
    this.transaction.agent_fee_type = this.agentfeetype;
    this.transaction.fee_allocation = this.feeallocation;
 this.transaction.delivery = this.deliverylist;
console.log('yep fucker');
  }


  }
