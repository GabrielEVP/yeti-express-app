import { DeliveryPaymentStatus } from '@views/deliveries';

export interface DeliveryWithDebt {
  id: number;
  client_id: string;
  number: string;
  date: string;
  payment_status: DeliveryPaymentStatus;
  debt_id: number;
  debt_amount: number;
  debt_remaining_amount: number;
}
