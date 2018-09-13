import {Item} from './Items';
import {Status} from './Status';
import {User} from './User';
import {AgentFeeType} from './AgentFeeType';
import {Classification} from './Classification';
import {FeeAllocation} from './FeeAllocation';
import {TradeRole} from './TradeRole';
import {Delivery} from './Delivery';

export class Transactions {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  transaction_code: string;
  period: number;
  invoice_amount: number;
  transaction_amount: number;
  inspection_period: number;
  classification_id: number;
  fee_allocation_id: number;
  agent_fee_type_id: number;
  transaction_status_id: number;
  payment_status_id: number;
  fee_value: number;
  agent_fee_value: number;
  seller_fee_amount: number;
  buyer_fee_amount: number;
  agent_fee_amount: number;
  total_fee_amount: number;
  buyer_amount: number;
  deposited_amount: number;
  balance_amount: number;
  overpayment_amount: number;
  agent_disburseable_amount: number;
  seller_disburseable_amount: number;
  items: Array<Item>;
  status: Status;
  user: User;
  trade_roles: Array<TradeRole>;
  agent_fee_type: AgentFeeType;
  classification: Classification;
  fee_allocation: FeeAllocation;
  delivery: Array<Delivery>;
  isBuyer = true;


  constructor() {
  }
}
