import {TradeParty} from './TradeParty';

export class TradeRole {
  id: number;
  created_at: string;
  updated_at: string;
  transaction_role_id: number;
  trading_party_id: number;
  transactions_id: number;
  trade_party: TradeParty;

  constructor() {
  }
}
