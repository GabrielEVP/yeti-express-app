import { DeliveryStatus } from '@/views/deliveries/';
import { DeliveryPaymentStatus } from '@/views/deliveries/';
import { PaymentType } from '@/views/deliveries/';
import { TimeLineContent } from '@time-line-content/domain';

export interface Delivery {
  id: string;
  number: string;
  date: Date;
  status: DeliveryStatus;
  paymentType: PaymentType;
  paymentStatus: DeliveryPaymentStatus;
  notes: string;
  amount: number;
  events: TimeLineContent[];
  receipt: DeliveryReceipt;
  debtRemainingAmount: number;
  createdAt: Date;
  updatedAt: Date;
  debtId: string;
  clientId: string;
  clientAddressId: string;
  courierId: string;
  serviceId: string;
}

export interface DeliveryReceipt {
  id: string;
  fullName: string;
  phone: string;
  address: string;
}
