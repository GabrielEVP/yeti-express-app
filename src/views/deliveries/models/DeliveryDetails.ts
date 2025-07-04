export interface DeliveryDetails {
  id: number;
  number: string;
  date: string;
  status: 'delivered' | 'pending' | 'cancelled' | string;
  payment_type: 'full' | 'partial' | string;
  payment_status: 'pending' | 'paid' | 'failed' | string;
  amount: number;
  pickup_address: string;
  cancellation_notes: string;
  notes: string;
  created_at: string;
  updated_at: string;
  client_legal_name: string;
  service_name: string;
  courier_full_name: string;
  receipt_full_name: string;
  receipt_phone: string;
  receipt_address: string;
}
