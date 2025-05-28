import { Delivery } from '@/views/deliveries/domain/Delivery';
import { DeliveryReceipt } from '@/views/deliveries/domain/DeliveryReceipt';
import { DeliveryClientPayment } from '@/views/deliveries/domain/DeliveryClientPayment';
import { DeliveryCourierPayment } from '@/views/deliveries/domain/DeliveryCourierPayment';
import { DeliveryStatus, PaymentType } from '@/views/deliveries/domain/';
import { mapFormToService } from '@/views/services/adapters';
import { mapFormToClient, mapFormToAddress } from '@/views/clients/adapters';
import { mapFormToCourier } from '@/views/couriers/adapters';

export function mapFormToDeliveryReceipt(data: any): DeliveryReceipt {
  return new DeliveryReceipt(
    data.id ?? '',
    data.fullName ?? '',
    data.phone ?? '',
    data.address ?? '',
    data.state ?? '',
    data.city ?? '',
    data.municipality ?? '',
    data.postalCode ?? '',
    data.deliveryId ?? ''
  );
}

export function mapFormToDeliveryClientPayment(data: any): DeliveryClientPayment {
  return new DeliveryClientPayment(
    data.id ?? '',
    data.date ?? new Date().toISOString(),
    data.method ?? null,
    data.amount ?? 0,
    data.deliveryId ?? ''
  );
}

export function mapFormToDeliveryCourierPayment(data: any): DeliveryCourierPayment {
  return new DeliveryCourierPayment(
    data.id ?? '',
    data.date ?? new Date().toISOString(),
    data.method ?? null,
    data.amount ?? 0,
    data.deliveryId ?? ''
  );
}

export function mapFormToDelivery(form: any): Delivery {
  return new Delivery(
    form.id ?? '',
    form.number ?? '',
    form.date ?? new Date().toISOString(),
    form.status ?? DeliveryStatus.PENDING,
    form.paymentType ?? PaymentType.PARTIAL,
    form.notes ?? '',
    mapFormToService(form.service ?? {}),
    mapFormToClient(form.client ?? {}),
    mapFormToAddress(form.clientAddress ?? {}),
    mapFormToCourier(form.courier ?? {}),
    [],
    mapFormToDeliveryReceipt(form.receipt ?? {}),
    (form.clientPayments ?? []).map(mapFormToDeliveryClientPayment),
    (form.courierPayments ?? []).map(mapFormToDeliveryCourierPayment),
    form.createdAt ?? new Date().toISOString(),
    form.updatedAt ?? new Date().toISOString()
  );
}
