import { DeliveryPaymentStatus, DeliveryStatus, PaymentType } from '@views/deliveries';

export interface DetailDelivery {
  id: string;
  number: string;
  date: string;
  status: DeliveryStatus;
  payment_type: PaymentType;
  payment_status: DeliveryPaymentStatus;
  amount: number;
  pickup_address: string;
  cancellation_notes: string;
  notes: string;
  client_legal_name: string;
  service_name: string;
  courier_full_name: string;
  receipt_full_name: string;
  receipt_phone: string;
  receipt_address: string;
  created_at: string;
  updated_at: string;
}
