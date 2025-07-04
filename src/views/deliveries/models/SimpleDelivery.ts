export interface SimpleDelivery {
  id: number;
  number: string;
  date: string;
  status: 'delivered' | 'pending' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed';
  amount: number;
  client_name: string;
  service_name: string;
  courier_full_name: string;
}
