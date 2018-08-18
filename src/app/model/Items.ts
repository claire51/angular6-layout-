export interface Item {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  quantity: number;
  unit_of_measures_id: number;
  transactions_id: number;
}
