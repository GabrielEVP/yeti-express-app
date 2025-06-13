import { Delivery, DeliveryReceipt } from '@/views/deliveries/';
import { DeliveryStatus } from '@/views/deliveries/';
import { DeliveryPaymentStatus } from '@/views/deliveries/';
import { PaymentType } from '@/views/deliveries/';
import { TimeLineContent } from '@time-line-content/domain';

export const createDefaultDeliveryReceipt = (): DeliveryReceipt => ({
  id: '',
  fullName: '',
  phone: '',
  address: '',
});

export const createDefaultDelivery = (): Delivery => ({
  id: '',
  number: '',
  date: new Date(),
  status: DeliveryStatus.PENDING,
  paymentType: PaymentType.FULL,
  paymentStatus: DeliveryPaymentStatus.PENDING,
  notes: '',
  amount: 0,
  events: [] as TimeLineContent[],
  receipt: createDefaultDeliveryReceipt(),
  createdAt: new Date(),
  updatedAt: new Date(),
  clientId: '',
  clientAddressId: '',
  courierId: '',
  serviceId: '',
});
