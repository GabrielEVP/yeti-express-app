export interface HistoricalDelivery {
  date: string;
  total: number;
}

export interface HistoricalInvoiced {
  date: string;
  total: number;
}

export interface HistoricalBalance {
  date: string;
  total_collected: number;
  total_expenses: number;
  balance: number;
}

export interface DashboardStats {
  period: 'day' | 'week' | 'month' | 'year';
  start_date: string;
  end_date: string;
  total_delivered: number;
  total_invoiced: number;
  total_collected: number;
  total_company_bills: number;
  historical_delivered: HistoricalDelivery[];
  historical_invoiced: HistoricalInvoiced[];
  historical_balance: HistoricalBalance[];
}
