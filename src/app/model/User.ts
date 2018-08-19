import {Permission, Role} from './Role';

export class User {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  id_number: number;
  phone_number: string;
  country: string;
  county: string;
  email: string;
  created_at: string;
  updated_at: string;
  permissions: Array<Permission>;
  roles: Array<Role>;
  constructor() {
}
}
