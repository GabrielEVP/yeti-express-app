import { Delivery, DeliveryReceipt } from '@views/deliveries/models/Delivery';
import { adaptTimeLineContent } from '@/time-line-content/adapter';
import { DeliveryStatus, PaymentType } from '@views/deliveries/';
import { DeliveryPaymentStatus } from '@views/deliveries/';

export function adaptDelivery(apiData: any = {}): Delivery {
  return {
    id: apiData.id ?? '',
    number: apiData.number ?? '',
    date: apiData.date ?? '',
    status: (apiData.status as DeliveryStatus) ?? DeliveryStatus.PENDING,
    paymentType: (apiData.payment_type as PaymentType) ?? PaymentType.FULL,
    paymentStatus: (apiData.payment_status as DeliveryPaymentStatus) ?? DeliveryPaymentStatus.PENDING,
    notes: apiData.notes ?? '',
    amount: apiData.amount ?? 0,
    events: Array.isArray(apiData.events) ? apiData.events.map(adaptTimeLineContent) : [],
    receipt:
      typeof apiData.receipt === 'object' && apiData.receipt !== null
        ? adaptReceipt(apiData.receipt)
        : { id: '', fullName: '', phone: '', address: '' },
    debtRemainingAmount: apiData.debt_remaining_amount ?? 0,
    createdAt: apiData.created_at ?? '',
    updatedAt: apiData.updated_at ?? '',
    clientLegalName: apiData.client_legal_name ?? '',
    courierName: apiData.courier_name ?? '',
    serviceName: apiData.service_name ?? '',
    debtId: apiData.debt_id ?? '',
    clientId: apiData.client_id ?? '',
    clientAddressId: apiData.client_address_id ?? '',
    courierId: apiData.courier_id ?? '',
    serviceId: apiData.service_id ?? '',
  };
}

export function adaptDeliveryForApi(delivery: Delivery): any {
  return {
    notes: delivery.notes ?? '',
    receipt: adaptReceiptForApi(delivery.receipt),
    payment_type: delivery.paymentType,
    client_id: delivery.clientId ?? null,
    client_address_id: delivery.clientAddressId ?? null,
    courier_id: delivery.courierId ?? null,
    service_id: delivery.serviceId ?? null,
  };
}

export function adaptReceipt(apiReceipt: any = {}): DeliveryReceipt {
  return {
    id: apiReceipt.id ?? '',
    fullName: apiReceipt.full_name ?? '',
    phone: apiReceipt.phone ?? '',
    address: apiReceipt.address ?? '',
  };
}

export function adaptReceiptForApi(receipt: DeliveryReceipt): any {
  return {
    id: receipt.id ?? null,
    full_name: receipt.fullName ?? '',
    phone: receipt.phone ?? '',
    address: receipt.address ?? '',
  };
}
