import { Event } from '@/models/';

export interface Delivery {
  id: string;
  number: string;
  date: string;
  status: 'pending' | 'paid' | 'refused';
  paymentType: 'partial' | 'full';
  notes: string;
  serviceId: string;
  clientId: string;
  clientAddressId: string;
  courierId: string;
  openBoxId: string;
  closeBoxId: string;
  userId: string;
  events: DeliveryEvent[];
  lines: DeliveryLine[];
  receipt: DeliveryReceipt;
  clientPayments: DeliveryClientPayment[];
  courierPayments: DeliveryCourierPayment[];
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryEvent extends Event {
  deliveryId: string;
}

export interface DeliveryReceipt {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  state: string;
  city: string;
  municipality: string;
  postalCode: string;
  deliveryId: string;
  userId: string;
}

export interface DeliveryLine {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  deliveryId: string;
  userId: string;
}

export interface DeliveryClientPayment {
  id: string;
  date: string;
  method: 'cash' | 'mobile_payment' | 'bank_transfer' | 'other';
  amount: number;
  deliveryId: string;
  userId: string;
}

export interface DeliveryCourierPayment {
  id: string;
  date: string;
  method: 'cash' | 'mobile_payment' | 'bank_transfer' | 'other';
  amount: number;
  deliveryId: string;
  userId: string;
}
