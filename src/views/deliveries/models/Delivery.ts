import { DeliveryStatus } from '@/views/deliveries/';
import { DeliveryPaymentStatus } from '@/views/deliveries/';
import { PaymentType } from '@/views/deliveries/';
import { TimeLineContent } from '@time-line-content';

export interface Delivery {
  id: string;
  number: string;
  date: Date;
  status: DeliveryStatus;
  paymentType: PaymentType;
  paymentStatus: DeliveryPaymentStatus;
  notes: string;
  amount: number;
  pickupAddress: string;
  cancellationNotes: string;
  events: TimeLineContent[];
  receipt: DeliveryReceipt;
  debtRemainingAmount: number;
  createdAt: Date;
  updatedAt: Date;
  clientLegalName?: string;
  clientAddress?: string;
  courierName?: string;
  serviceName?: string;
  debtId: string;
  clientId: string;
  courierId: string;
  serviceId: string;
}

export interface DeliveryReceipt {
  id: string;
  fullName: string;
  phone: string;
  address: string;
}
