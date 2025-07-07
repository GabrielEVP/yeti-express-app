import { DeliveryPaymentStatus } from '@views/deliveries';

export interface DeliveryWithDebt {
  id: string;
  client_id: string;
  number: string;
  date: string;
  payment_status: DeliveryPaymentStatus;
  debt_id: string;
  debt_amount: number;
  debt_remaining_amount: number;
}
