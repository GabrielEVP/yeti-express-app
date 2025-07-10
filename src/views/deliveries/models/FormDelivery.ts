import { DeliveryPaymentStatus, DeliveryStatus, PaymentType } from '@/views/deliveries/';
import { ClientType } from '@views/clients';

export interface FormDelivery {
  id: string;
  number: string;
  date: Date;
  status: DeliveryStatus;
  payment_type: PaymentType;
  payment_status: DeliveryPaymentStatus;
  notes: string;
  amount: number;
  pickup_address: string;
  cancellation_notes: string;
  receipt: FormDeliveryReceipt;
  anonymous_client: FormDeliveryAnonymousClient;
  client_id: string;
  courier_id: string;
  service_id: string;
}

export interface FormDeliveryReceipt {
  id: string;
  full_name: string;
  phone: string;
  address: string;
}

export interface FormDeliveryAnonymousClient {
  id: string;
  delivery_id: string;
  legal_name: string;
  type: ClientType;
  registration_number: string;
  phone: string;
}
