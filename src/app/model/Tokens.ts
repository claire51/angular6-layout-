import {User} from './User';

export interface Tokens {
  status: string;
  token: string;
  expires_in: number;
  user: User;
}
