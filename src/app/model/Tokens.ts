import {User} from './User';

export interface Tokens {
  status: string;
  token: string;
  tokenType: string;
  expires_in: number;
  user: User;
}
