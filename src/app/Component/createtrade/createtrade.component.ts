import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {TradeRole} from '../../model/TradeRole';
import {TradeParty} from '../../model/TradeParty';
import {Transactions} from '../../model/Transactions';
import {Delivery} from '../../model/Delivery';
import {Item} from '../../model/Items';
import {FeeAllocation} from '../../model/FeeAllocation';
import {Classification} from '../../model/Classification';
import {AgentFeeType} from '../../model/AgentFeeType';
import {User} from '../../model/User';
import {MatTabChangeEvent} from '@angular/material';
import {Router} from '@angular/router';
import {Transactionservc} from '../../localService/transactionservc';
import {Charges} from '../../model/Charges';
import {CalculatorfeeService} from '../../localService/calculatorfee.service';
import {ClassificationService} from '../../localService/classification.service';
import {FeeallocationService} from '../../localService/feeallocation.service';

@Component({
  selector: 'app-createtrade',
  templateUrl: './createtrade.component.html',
  styleUrls: ['./createtrade.component.scss']
})
export class CreatetradeComponent implements OnInit , AfterViewInit {
  selectedtab: number;
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

  phone_numberz: string;
  full_namesz: string;
  id_numberz: string;
  emailzz: string;
  feeamount: number;
  chargesz: Array<Charges> = new Array<Charges>();
  totalinvoiceamount: number;
  fee: number;
  payamount: number;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  // model
  traderolelist: Array<TradeRole> = new Array<TradeRole>();
  tradeparty: TradeParty = new TradeParty();
  traderole: TradeRole = new TradeRole();
  transaction: Transactions = new Transactions();
  transactionresp: Transactions = new Transactions();
  delivery: Delivery = new Delivery();
  item: Item = new Item();
  itemlist: Array<Item> = new Array<Item>();
  deliverylist: Array<Delivery> = new Array<Delivery>();
  feeallocationz: Array<FeeAllocation> = new Array<FeeAllocation>();
  classificationz: Array<Classification> = new Array<Classification>();
  feeallocation: FeeAllocation = new FeeAllocation();
  classification: Classification = new Classification();
  agentfeetype: AgentFeeType = new AgentFeeType();
  user: User = new User();
  private formSubmitAttempt: boolean;

  constructor(public auth: AuthService, private _formBuilder: FormBuilder,
              private transactionsvc: Transactionservc, private router: Router, private calcservice: CalculatorfeeService,
              private classificationservice: ClassificationService, private feallocationservice: FeeallocationService) {
    this.role = 'buyer';
    this.selectedtab = 0;
    this.payamount = 0;
    this.fee = 0;
    this.totalinvoiceamount = 0;
    this.feeamount = 0;
  }

  ngOnInit() {
    if (this.auth.verified === 0) {
      this.router.navigate(['/verify']);
    }


    this.firstFormGroup = this._formBuilder.group({
      phone_number: ['', Validators.compose([Validators.required, Validators.pattern(/^07\d{8}$/)]) ],
      full_names: ['', Validators.compose([ Validators.required, Validators.minLength(3), Validators.pattern(/[A-Za-z]/)])],
      id_number: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      email: ['', Validators.compose([Validators.required, Validators.email]) ],
      address: ['', Validators.compose([ Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_.-]*$/)])],
    });
    this.secondFormGroup = this._formBuilder.group({
      del_cntry: ['', Validators.compose([ Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9_.-]*$/)])],
      del_cnty: ['', Validators.compose([ Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9_.-]*$/)])],
      del_twn: ['', Validators.compose([ Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9_.-]*$/)])],
      del_strt: ['', Validators.compose([ Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9_.-]*$/)])],
      delivery_postal_code: ['',  Validators.pattern(/^[0-9]/)],
      del_ln: ['', Validators.compose([ Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9_.-]*$/)])],
      del_cmt: ['', Validators.compose([ Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9_.-]*$/)])],
    });
    this.thirdFormGroup = this._formBuilder.group({
      id: ['1'],
      name: ['', Validators.compose([ Validators.required, Validators.minLength(3), Validators.pattern(/[A-Za-z]/)])],
      description: ['', Validators.compose([ Validators.required, Validators.minLength(3), Validators.pattern(/[A-Za-z]/)])],
      quantity: ['0', Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      unit_of_measures_id: ['1', Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      transactions_id: ['0', Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      classification_id: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
    });
    this.fourthFormGroup = this._formBuilder.group({
      invoice_amount: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      period: ['0', Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      inspection_period: ['0', Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
      agent_fee_value: ['0',  Validators.pattern(/^[0-9]/)],
      feeAlocation_id: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]/)]) ],
    });
  }
  ngAfterViewInit() {
    this.classificationservice.getdata().subscribe((newHeroWithId) => {
      this.classificationz = newHeroWithId;
      this.feallocationservice.getdata().subscribe((newHeroWithIdb) => {
        this.feeallocationz = newHeroWithIdb;
        this.calcservice.getdata().subscribe((newHeroWithIdc) => {
          this.chargesz = newHeroWithIdc;
        }, (response: Response) => {
          if (response.status <= 500) {
            this.auth.showSnackBar('ooops something went wrong  ');
          }
        });
      }, (response: Response) => {
        if (response.status <= 500) {
          this.auth.showSnackBar('ooops something went wrong  ');
        }
      });
    }, (response: Response) => {
      if (response.status <= 500) {
        this.auth.showSnackBar('ooops something went wrong  ');
      }
    });
  }
  isFieldInvalid(field: string) {
    return (
      (!this.firstFormGroup .get(field).valid && this.firstFormGroup.get(field).touched) ||
      (this.firstFormGroup.get(field).untouched && this.formSubmitAttempt)
    );
  }
  onsubmitformone() {
    this.formSubmitAttempt = true;
    this.tradeparty = new TradeParty();
    this.traderole = new TradeRole();
    this.traderolelist.length = 0;
    this.tradeparty.full_names = this.full_namesz;
    this.tradeparty.id_number = this.id_numberz;
    this.tradeparty.phone_number = this.phone_numberz;
    this.tradeparty.address = '';
    this.tradeparty.email = this.emailzz;

    this.tradeparty.user_id = null;
    if (this.isseller) {
      this.traderole.trading_party_id = 2;
      this.traderole.transaction_role_id = 2;
      this.traderole.id = 2;
    } else if (this.isbuyer = true) {
      this.traderole.trading_party_id = 1;
      this.traderole.transaction_role_id = 1;
      this.traderole.id = 1;
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
    this.tradeparty.user_id = +localStorage.getItem('id');
    if (this.isseller) {
      this.traderole.trading_party_id = 1;
      this.traderole.transaction_role_id = 1;
      this.traderole.id = 1;
    } else if (this.isbuyer = true) {
      this.traderole.trading_party_id = 2;
      this.traderole.transaction_role_id = 2;
      this.traderole.id = 2;
    } else if (this.isagent = true) {
      this.traderole.trading_party_id = 3;
      this.traderole.transaction_role_id = 3;
      this.traderole.id = 3;
    }
    this.traderole.trade_party = this.tradeparty;
    this.traderolelist.push(this.traderole);
// agent
    if (this.isagent || this.broker) {
      this.addbroker();
    }

    this.next();
  }

  addbroker() {
    this.traderole = new TradeRole();
    this.tradeparty = new TradeParty();
    this.tradeparty.full_names = this.fullnamez;
    console.log(this.fullnamez);
    this.tradeparty.id_number = this.fullnamez;
    this.tradeparty.phone_number = this.mobilez;
    this.tradeparty.address = '234,thika';
    this.tradeparty.email = this.emailz;
    this.tradeparty.user_id = null;
    if (this.broker) {
      this.traderole.trading_party_id = 3;
      this.traderole.transaction_role_id = 3;
      this.traderole.id = 3;
    } else if (this.isagent = true) {
      this.traderole.trading_party_id = 2;
      this.traderole.transaction_role_id = 2;
      this.traderole.id = 2;
    }
    this.traderole.trade_party = this.tradeparty;
    this.traderolelist.push(this.traderole);

  }

  onsubmitformtwo() {
    this.deliverylist.length = 0;
    this.delivery.delivery_comment = this.secondFormGroup.value.del_cmt;
    this.delivery.delivery_postal_code = this.secondFormGroup.value.delivery_postal_code;
    this.delivery.delivery_lane = this.secondFormGroup.value.del_ln;
    this.delivery.delivery_street = this.secondFormGroup.value.del_strt;
    this.delivery.delivery_town = this.secondFormGroup.value.del_twn;
    this.delivery.delivery_county = this.secondFormGroup.value.del_cnty;
    this.delivery.delivery_country = this.secondFormGroup.value.del_cntry;
    this.deliverylist.push(this.delivery);
    console.log(this.deliverylist);
  }


  onsubmitformthree() {
    if (this.thirdFormGroup.valid) {
      this.classification.id = this.thirdFormGroup.value.classification_id;
      this.itemlist.length = 0;
      this.item.name = this.thirdFormGroup.value.name;
      this.item.description = this.thirdFormGroup.value.description;
      this.item.quantity = this.thirdFormGroup.value.quantity;
      this.item.unit_of_measures_id = 1;
      this.itemlist.push(this.item);
    }

  }

  onsubmitformfourth() {
    if (this.fourthFormGroup.valid) {
      this.feeallocation.id = this.fourthFormGroup.value.feeAlocation_id;
      this.transaction.invoice_amount = this.fourthFormGroup.value.invoice_amount;
      this.transaction.transaction_amount = this.fourthFormGroup.value.invoice_amount;
      this.totalinvoiceamount = this.transaction.invoice_amount;
      this.transaction.period = this.fourthFormGroup.value.period;
      this.transaction.inspection_period = this.fourthFormGroup.value.inspection_period;
      this.transaction.agent_fee_amount = 0;
      this.transaction.agent_fee_value = 1;
      this.transaction.agent_fee_type_id = 1;
      for (let item of this.chargesz) {
        let arravalue = item.range.split('-');
        let min = arravalue[0];
        let max = arravalue[1];
        if (+min <= this.transaction.invoice_amount && this.transaction.invoice_amount < +max) {
          this.feeamount = +item.value;
        }
      }
      this.fee = this.feeamount;
      this.payamount = this.totalinvoiceamount + this.fee;
      this.transaction.invoice_amount = this.transaction.invoice_amount + this.feeamount;
    }
  }

  finishtransaction() {
    this.agentfeetype.id = 1;
    this.transaction.items = this.itemlist;
    //  finishup
    this.transaction.classification = this.classification;
    this.transaction.trade_roles = this.traderolelist;
    this.transaction.agent_fee_type = this.agentfeetype;
    this.transaction.fee_allocation = this.feeallocation;
    this.transaction.delivery = this.deliverylist;

    this.transactionsvc.createtransaction(this.transaction).subscribe((transaresp) => {
        this.transactionresp = transaresp;
        if (this.transactionresp.id > 0) {
          console.log(this.transactionresp.id);
          this.auth.showSnackBar(' Order place succefully, your transaction code is ' +
            this.transactionresp.transaction_code + 'You will get SMS Invoice');
          this.router.navigate(['/viewtrade', 1]);
        }
      },
      (response: Response) => {
        if (response.status <= 500) {
          this.auth.showSnackBar(' ooops! Something  wrong happenned');
        }
      });

  }


  next() {
    this.selectedtab = this.selectedb.value + 1;
  }

  previous() {
    if (this.selectedtab > 0) {
      this.selectedtab = this.selectedb.value - 1;
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
