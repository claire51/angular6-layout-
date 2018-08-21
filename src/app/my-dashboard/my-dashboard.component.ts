import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MatTabChangeEvent} from '@angular/material';
import {Transactionservc} from '../localService/transactionservc';
import {AuthService} from '../auth.service';
import {TradeParty} from '../model/TradeParty';
import {TradeRole} from '../model/TradeRole';
import {AgentFeeType} from '../model/AgentFeeType';
import {Classification} from '../model/Classification';
import {Delivery} from '../model/Delivery';
import {User} from '../model/User';
import {FeeAllocation} from '../model/FeeAllocation';
import {Transactions} from '../model/Transactions';
import {Item} from '../model/Items';
@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent  implements  OnInit {
  selected: number;
  selectedb = new FormControl(0);
  role: string;
  isbuyer: boolean;
  isseller: boolean;
  broker: boolean;
  isagent: boolean;
  formavalue: string;
  formavalueb: string;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  // model
  traderolelist: Array<TradeRole> = new Array<TradeRole>();
  tradeparty: TradeParty = new TradeParty();
  traderole: TradeRole = new TradeRole() ;
  transaction: Transactions = new Transactions();
  delivery: Delivery = new Delivery();
  item: Item = new Item();
  itemlist: Array<Item> = new Array<Item>();
  deliverylist: Array<Delivery> = new Array<Delivery>();
  feeallocation: FeeAllocation = new FeeAllocation();
  classification: Classification = new Classification();
  agentfeetype: AgentFeeType = new AgentFeeType();
  user: User = new User();
  constructor(public auth: AuthService , private _formBuilder: FormBuilder, private transactionsvc: Transactionservc) {
    this.role = 'buyer';
    this.selected = 0;
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
      this.tradeparty = new TradeParty();
      this.traderole = new TradeRole();
      this.traderolelist.length = 0;
      this.tradeparty.full_names =  this.firstFormGroup.value.full_names;
      this.tradeparty.id_number = this.firstFormGroup.value.id_number;
      this.tradeparty.phone_number = this.firstFormGroup.value.phone_number;
      this.tradeparty.address = this.firstFormGroup.value.address;
      this.tradeparty.email = this.firstFormGroup.value.email;
      this.tradeparty.user_id = null;
      if (this.isbuyer) {
        this.traderole.trading_party_id = 2;
      } else {  this.traderole.trading_party_id = 1; }
      this.traderole.trade_party = this.tradeparty;
      this.traderolelist.push(this.traderole);
      // user deetail
      //      transaction role , id 1 buyer, 2 seller , 3 agent
      this.tradeparty = new TradeParty();
      this.traderole = new TradeRole();
      this.tradeparty.full_names = localStorage.getItem('firstname');
      this.tradeparty.id_number = localStorage.getItem('idnumber');
      this.tradeparty.phone_number = localStorage.getItem('phone_number');
      this.tradeparty.address = localStorage.getItem('county');
      this.tradeparty.email = localStorage.getItem('email');
      this.tradeparty.user_id = null;
      if (this.isbuyer) {
        this.traderole.trading_party_id = 1;
      } else {  this.traderole.trading_party_id = 2; }

      this.traderole.trade_party = this.tradeparty;
      this.traderolelist.push(this.traderole);

      console.log(this.firstFormGroup.value.email);
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
    if (this.selectedb.value === 1) {
      if (this.role === 'buyer') {
       this.isseller = true;
       this.formavalue = 'Seller';
        this.formavalueb = 'Agent';
        this.isagent = false;
      }
      if (this.role === 'seller') {
       this.isbuyer = true;
        this.formavalue = 'Buyer';
        this.formavalueb = 'Agent';
        this.isagent = false;
      }
      if (this.role === 'agent') {
        this.isagent = true;
        this.formavalue = 'Buyer';
        this.formavalueb = 'Seller';
        this.isbuyer = true;
        this.isseller = true;
      }
    }
  }
  }
