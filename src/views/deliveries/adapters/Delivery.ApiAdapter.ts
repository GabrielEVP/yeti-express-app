import { Delivery } from '@/views/deliveries/domain/Delivery';
import { DeliveryStatus } from '@/views/deliveries/domain/Status';
import { PaymentType } from '@/views/deliveries/domain/PaymentType';
import { DeliveryReceipt } from '@/views/deliveries/domain/DeliveryReceipt';
import { DeliveryClientCharge } from '@/views/deliveries/domain/DeliveryClientCharge';
import { DeliveryCourierPayout } from '@/views/deliveries/domain/DeliveryCourierPayout';
import { ClientApiAdapter, ClientAddressApiAdapter } from '@/views/clients/adapters/';
import { adaptCourier } from '@/views/couriers/';
import { adaptService } from '@/views/services/';
import { adaptTimeLineContent } from '@time-line-content/adapter';
import { DeliveryPaymentStatus } from '@/views/deliveries/domain';
import { DeliveryCollectionStatus } from '@/views/deliveries/domain';

function adaptDeliveryClientPayment(apiPayment: any): DeliveryClientCharge {
  return new DeliveryClientCharge(
    apiPayment.id,
    apiPayment.date,
    apiPayment.method,
    apiPayment.amount
  );
}

function adaptDeliveryCourierPayment(apiPayment: any): DeliveryCourierPayout {
  return new DeliveryCourierPayout(
    apiPayment.id,
    apiPayment.date,
    apiPayment.method,
    apiPayment.amount
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
    apiData.payment_type as PaymentType,
    apiData.DeliveryPaymentStatus as DeliveryPaymentStatus,
    apiData.notes ?? '',
    adaptService(apiData.service),
    ClientApiAdapter.fromApi(apiData.client),
    ClientAddressApiAdapter.fromApi(apiData.client_address),
    adaptCourier(apiData.courier),
    Array.isArray(apiData.events) ? apiData.events.map(adaptTimeLineContent) : [],
    adaptDeliveryReceipt(apiData.receipt),
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

export function adaptDeliveryToCourier(apiData: any): Delivery {
  return new Delivery(
    apiData.id,
    apiData.number,
    apiData.date,
    apiData.status as DeliveryStatus,
    apiData.payment_type as PaymentType,
    apiData.payment_status as DeliveryPaymentStatus,
    apiData.notes ?? '',
    adaptService(apiData.service),
    null as any,
    null as any,
    null as any,
    [],
    null as any,
    '',
    '',
    '',
    '',
    '',
    ''
  );
}
export function adaptDeliveryToClient(apiData: any): Delivery {
  return new Delivery(
    apiData.id,
    apiData.number,
    apiData.date,
    apiData.status as DeliveryStatus,
    apiData.payment_type as PaymentType,
    apiData.payment_status as DeliveryPaymentStatus,
    apiData.notes ?? '',
    adaptService(apiData.service),
    null as any,
    null as any,
    null as any,
    [],
    null as any,
    '',
    '',
    '',
    '',
    '',
    ''
  );
}
