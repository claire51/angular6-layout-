import {Permission, Role} from './Role';
import {Resource} from "./Resource";

export class User extends Resource {
  first_name: string;
  middle_name: string;
  last_name: string;
  id_number: number;
  phone_number: string;
  country: string;
  county: string;
  email: string;
  verification_code: string;
  phone_verified: number;
  email_verified: number;
  created_at: string;
  updated_at: string;
  permissions: Array<Permission>;
  roles: Array<Role>;
  mail_verification_code: string;
  constructor() { super();
}
}
