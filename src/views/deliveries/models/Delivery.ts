import { Event } from '@/models/';
import { Service } from '@/views/services';

export interface Delivery {
  id: string;
  number: string;
  date: string;
  status: 'pending' | 'paid' | 'refused';
  paymentType: 'partial' | 'full' | null;
  notes: string;
  clientId: string;
  clientAddressId: string;
  courierId: string;
  openBoxId: string;
  closeBoxId: string;
  userId: string;
  service: Service;
  events: DeliveryEvent[];
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

export interface DeliveryClientPayment {
  id: string;
  date: string;
  method: 'cash' | 'mobile_payment' | 'bank_transfer' | 'other' | null;
  amount: number;
  deliveryId: string;
  userId: string;
}

export interface DeliveryCourierPayment {
  id: string;
  date: string;
  method: 'cash' | 'mobile_payment' | 'bank_transfer' | 'other' | null;
  amount: number;
  deliveryId: string;
  userId: string;
}
