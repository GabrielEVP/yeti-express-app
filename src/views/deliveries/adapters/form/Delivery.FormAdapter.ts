import { Delivery } from '@/views/deliveries/domain/Delivery';
import { DeliveryReceipt } from '@/views/deliveries/domain/DeliveryReceipt';
import { DeliveryPaymentStatus, DeliveryStatus, PaymentType } from '@/views/deliveries/domain/';
import { ServiceFormAdapter } from '@views/services';
import { ClientFormAdapter, ClientAddressFormAdapter } from '@/views/clients/adapters';
import { mapFormToCourier } from '@/views/couriers/adapters';

export function mapFormToDeliveryReceipt(data: any): DeliveryReceipt {
  return new DeliveryReceipt(
    data.id ?? '',
    data.fullName ?? '',
    data.phone ?? '',
    data.address ?? ''
  );
}

export function mapFormToDelivery(form: any): Delivery {
  return new Delivery(
    form.id ?? '',
    form.number ?? '',
    form.date ?? new Date().toISOString(),
    form.status ?? DeliveryStatus.PENDING,
    form.paymentType ?? PaymentType.PARTIAL,
    form.paymentStatus ?? DeliveryPaymentStatus.PENDING,
    form.notes ?? '',
    ServiceFormAdapter.fromForm(form.service ?? {}),
    ClientFormAdapter.fromForm(form.client ?? {}),
    ClientAddressFormAdapter.fromForm(form.clientAddress ?? {}),
    mapFormToCourier(form.courier ?? {}),
    [],
    mapFormToDeliveryReceipt(form.receipt ?? {}),
    null as any,
    form.createdAt ?? new Date().toISOString(),
    form.updatedAt ?? new Date().toISOString(),
    form.serviceId ?? '',
    form.clientId ?? '',
    form.clientAddressId ?? '',
    form.courierId ?? ''
  );
}
