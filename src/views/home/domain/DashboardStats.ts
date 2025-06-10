export interface Delivery {
  id: string;
  date: string;
  amount: number;
  service: {
    id: string;
    name: string;
    bills: Array<{
      id: string;
      amount: number;
    }>;
  };
}

export interface HistoricalDelivery {
  date: string;
  count: number;
  total: number;
}

export interface DashboardStats {
  period: 'day' | 'week' | 'month' | 'year';
  start_date: string;
  end_date: string;
  deliveries: {
    total: number;
    list: Delivery[];
  };
  total_invoiced: number;
  debt_payments: number;
  company_bills: number;
  total_earnings: number;
  cash_balance: number;
  historical_data: {
    deliveries: HistoricalDelivery[];
  };
}
