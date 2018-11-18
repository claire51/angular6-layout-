import {Permission, Role} from "./Role";

export interface User {
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
  permissions: Permission[];
  roles: Role[];
}
