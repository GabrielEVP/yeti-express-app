export interface ListService {
  id: string;
  name: string;
  description: string;
  amount: number;
  total_expense: number;
  total_earning: number;
  can_delete: boolean;
}
