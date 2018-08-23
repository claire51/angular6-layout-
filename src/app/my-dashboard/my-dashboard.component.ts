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

  mobilez: string;
  fullnamez: string;
  idnumberz: string;
  emailz: string;

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
      del_cntry: ['' ],
      del_cnty: ['' ],
      del_twn: ['' ],
      del_strt: ['' ],
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
      if ( this.isseller ) {
        this.traderole.trading_party_id = 2;
      } else if (this.isbuyer = true) {
        this.traderole.trading_party_id = 1;
        }
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
      if ( this.isseller ) {
        this.traderole.trading_party_id = 1;
      } else if (this.isbuyer = true) {
        this.traderole.trading_party_id = 2;
      } else if (this.isagent = true) {
        this.traderole.trading_party_id = 3;
      }
      this.traderole.trade_party = this.tradeparty;
      this.traderolelist.push(this.traderole);
// agent
      if ( this.isagent || this.broker) {
        this.addbroker();
      }



      console.log(this.firstFormGroup.value.email);
    }
  }

  addbroker() {
    this.traderole = new TradeRole();
    this.tradeparty = new TradeParty();
    this.tradeparty.full_names = this.fullnamez;
    this.tradeparty.id_number = this.fullnamez;
    this.tradeparty.phone_number = this.mobilez;
    this.tradeparty.address = '234,thika';
    this.tradeparty.email = this.emailz;
    this.tradeparty.user_id = null;
    if ( this.broker ) {
      this.traderole.trading_party_id = 3;
    }  else if (this.isagent = true) {
      this.traderole.trading_party_id = 2;
    }
    this.traderole.trade_party = this.tradeparty;
    this.traderolelist.push(this.traderole);

  }

  onsubmitformtwo() {
    this.delivery.delivery_comment = this.secondFormGroup.value.del_cmt;
    this.delivery.delivery_postal_code = this.secondFormGroup.value.delivery_postal_code;
    this.delivery.delivery_lane = this.secondFormGroup.value.del_ln;
    this.delivery.delivery_street = this.secondFormGroup.value.del_strt;
    this.delivery.delivery_town = this.secondFormGroup.value.del_twn;
    this.delivery.delivery_county = this.secondFormGroup.value.del_cnty;
    this.delivery.delivery_country = this.secondFormGroup.value.del_cntry;
    this.deliverylist.push(this.delivery)
    console.log(this.deliverylist);
  }


  onsubmitformthree() {
    if (this.thirdFormGroup.valid) {
      this.item.name  = this.thirdFormGroup.value.name;
      this.item.description  = this.thirdFormGroup.value.description;
      this.item.quantity  = this.thirdFormGroup.value.quantity;
      console.log('waaaaaaaaaaaa' + this.thirdFormGroup.value.description);
      this.item.unit_of_measures_id  = 1;
      this.itemlist.push(this.item);
    }

  }

  onsubmitformfourth() {
    if (this.fourthFormGroup.valid) {
      this.transaction.invoice_amount = this.fourthFormGroup.value.invoice_amount;
      this.transaction.period =  this.fourthFormGroup.value.period;
      this.transaction.inspection_period = this.fourthFormGroup.value.inspection_period;
      this.transaction.agent_fee_amount = this.fourthFormGroup.value.agent_fee_value;
      this.transaction.agent_fee_type_id = 1;
      console.log(this.fourthFormGroup.value.invoice_amount);
    }
  }

  finishtransaction() {
    this.feeallocation.id = 1;
    this.classification.id = 1;
    if (this.broker) { this.agentfeetype.id = 1; }
    this.transaction.items = this.itemlist;
    // this.user = JSON.parse(localStorage.getItem('user'));
    // user trade role
    this.transaction.classification = this.classification;
    this.transaction.trade_roles = this.traderolelist;
    this.transaction.agent_fee_type = this.agentfeetype;
    this.transaction.fee_allocation = this.feeallocation;
    this.transaction.delivery = this.deliverylist;

    this.transactionsvc.createtransaction(this.transaction).subscribe((transaresp) => {
        this.transaction = transaresp;
        if (this.transaction.id !== 0) {
          console.log(this.transaction.id);
          this.auth.showSnackBar(' Order place succefully');
        }
      },
      (response: Response) => {
        if (response.status <= 500) {
          this.auth.showSnackBar(' ooops! Something  wrong happenned');
        }
      });

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
      }
    }
  }
  }
