import { Delivery } from '@/views/deliveries/domain/Delivery';
import { DeliveryReceipt } from '@/views/deliveries/domain/DeliveryReceipt';
import { DeliveryClientCharge } from '@/views/deliveries/domain/DeliveryClientCharge';
import { DeliveryCourierPayout } from '@/views/deliveries/domain/DeliveryCourierPayout';
import { DeliveryStatus, PaymentType } from '@/views/deliveries/domain/';
import { mapFormToService } from '@/views/services/adapters';
import { mapFormToClient, mapFormToAddress } from '@/views/clients/adapters';
import { mapFormToCourier } from '@/views/couriers/adapters';

export function mapFormToDeliveryReceipt(data: any): DeliveryReceipt {
  return new DeliveryReceipt(
    data.id ?? '',
    data.fullName ?? '',
    data.phone ?? '',
    data.address ?? ''
  );
}

export function mapFormToDeliveryClientPayment(data: any): DeliveryClientCharge {
  return new DeliveryClientCharge(
    data.id ?? '',
    data.date ?? new Date().toISOString(),
    data.method ?? null,
    data.amount ?? 0,
    data.deliveryId ?? ''
  );
}

export function mapFormToDeliveryCourierPayment(data: any): DeliveryCourierPayout {
  return new DeliveryCourierPayout(
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
    '' as any,
    '' as any,
    form.paymentType ?? PaymentType.PARTIAL,
    form.notes ?? '',
    mapFormToService(form.service ?? {}),
    mapFormToClient(form.client ?? {}),
    mapFormToAddress(form.clientAddress ?? {}),
    mapFormToCourier(form.courier ?? {}),
    [],
    mapFormToDeliveryReceipt(form.receipt ?? {}),
    [],
    [],
    form.createdAt ?? new Date().toISOString(),
    form.updatedAt ?? new Date().toISOString(),
    form.serviceId ?? '',
    form.clientId ?? '',
    form.clientAddressId ?? '',
    form.courierId ?? ''
  );
}
