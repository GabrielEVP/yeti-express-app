import { DeliveryStatus } from '@views/deliveries';

export interface ListDelivery {
  id: string;
  number: string;
  date: string;
  status: DeliveryStatus;
  amount: number;
  client_name: string;
  service_name: string;
  courier_full_name: string;
}
