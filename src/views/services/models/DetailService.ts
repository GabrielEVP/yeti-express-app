export interface DetailService {
  id: string;
  name: string;
  description: string;
  amount: number;
  total_expense: number;
  total_earning: number;
  created_at: string;
  updated_at: string;
  bills: Bill[];
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
}
