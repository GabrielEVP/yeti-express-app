import { Delivery } from '@/views/deliveries/domain/Delivery';
import { DeliveryStatus } from '@/views/deliveries/domain/Status';
import { PaymentType } from '@/views/deliveries/domain/PaymentType';
import { DeliveryReceipt } from '@/views/deliveries/domain/DeliveryReceipt';
import { DeliveryClientCharge } from '@/views/deliveries/domain/DeliveryClientCharge';
import { DeliveryCourierPayout } from '@/views/deliveries/domain/DeliveryCourierPayout';
import { adaptClient, adaptClientAddress } from '@/views/clients/adapters/';
import { adaptCourier } from '@/views/couriers/';
import { adaptService } from '@/views/services/';
import { adaptTimeLineContent } from '@time-line-content/adapter';

function adaptDeliveryClientPayment(apiPayment: any): DeliveryClientCharge {
  return new DeliveryClientCharge(
    apiPayment.id,
    apiPayment.date,
    apiPayment.method,
    apiPayment.amount,
    apiPayment.delivery_id
  );
}

function adaptDeliveryCourierPayment(apiPayment: any): DeliveryCourierPayout {
  return new DeliveryCourierPayout(
    apiPayment.id,
    apiPayment.date,
    apiPayment.method,
    apiPayment.amount,
    apiPayment.delivery_id
  );
}

function adaptDeliveryReceipt(apiReceipt: any): DeliveryReceipt {
  return new DeliveryReceipt(
    apiReceipt.id,
    apiReceipt.full_name,
    apiReceipt.phone,
    apiReceipt.address
  );
}

export function adaptDelivery(apiData: any): Delivery {
  return new Delivery(
    apiData.id,
    apiData.number,
    apiData.date,
    apiData.status as DeliveryStatus,
    '' as any,
    '' as any,
    apiData.payment_type as PaymentType,
    apiData.notes ?? '',
    adaptService(apiData.service),
    adaptClient(apiData.client),
    adaptClientAddress(apiData.client_address),
    adaptCourier(apiData.courier),
    Array.isArray(apiData.events) ? apiData.events.map(adaptTimeLineContent) : [],
    adaptDeliveryReceipt(apiData.receipt),
    Array.isArray(apiData.client_payments)
      ? apiData.client_payments.map(adaptDeliveryClientPayment)
      : [],
    Array.isArray(apiData.courier_payments)
      ? apiData.courier_payments.map(adaptDeliveryCourierPayment)
      : [],
    apiData.created_at,
    apiData.updated_at,
    apiData.service_id,
    apiData.client_id,
    apiData.client_address_id,
    apiData.courier_id
  );
}

export function adaptDeliveryForApi(delivery: Delivery): any {
  return {
    status: delivery.getStatus(),
    payment_type: delivery.getPaymentType(),
    notes: delivery.getNotes(),
    receipt: adaptDeliveryReceiptForApi(delivery.getReceipt()),
    client_payments: delivery.getClientPayments(),
    courier_payments: delivery.getCourierPayments(),
    client_id: delivery.getClientId(),
    courier_id: delivery.getCourierId(),
    service_id: delivery.getServiceId(),
    client_address_id: delivery.getClientAddressId(),
  };
}

function adaptDeliveryReceiptForApi(deliveryReceipt: DeliveryReceipt): any {
  return {
    id: deliveryReceipt.getId(),
    full_name: deliveryReceipt.getFullName(),
    phone: deliveryReceipt.getPhone(),
    address: deliveryReceipt.getAddress(),
  };
}

export function adaptDeliveryLite(apiData: any): Delivery {
  return new Delivery(
    apiData.id,
    apiData.number,
    apiData.date,
    apiData.status as DeliveryStatus,
    apiData.payment_type as PaymentType,
    apiData.notes ?? '',
    adaptService(apiData.service),
    null as any,
    null as any,
    null as any,
    null as any,
    null as any,
    [],
    [],
    '',
    '',
    '',
    '',
    '',
    ''
  );
}
