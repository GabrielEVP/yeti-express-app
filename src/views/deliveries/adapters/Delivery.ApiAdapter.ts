import { Delivery } from '@/views/deliveries/domain/Delivery';
import { DeliveryStatus } from '@/views/deliveries/domain/Status';
import { PaymentType } from '@/views/deliveries/domain/PaymentType';
import { DeliveryTimeLine } from '@/views/deliveries/domain/DeliveryTimeLine';
import { DeliveryReceipt } from '@/views/deliveries/domain/DeliveryReceipt';
import { DeliveryClientPayment } from '@/views/deliveries/domain/DeliveryClientPayment';
import { DeliveryCourierPayment } from '@/views/deliveries/domain/DeliveryCourierPayment';
import { adaptClient, adaptClientAddress } from '@/views/clients/adapters/';
import { adaptCourier } from '@/views/couriers/';
import { adaptService } from '@/views/services/';

function adaptDeliveryClientPayment(apiPayment: any): DeliveryClientPayment {
  return new DeliveryClientPayment(
    apiPayment.id,
    apiPayment.date,
    apiPayment.method,
    apiPayment.amount,
    apiPayment.delivery_id
  );
}

function adaptDeliveryCourierPayment(apiPayment: any): DeliveryCourierPayment {
  return new DeliveryCourierPayment(
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
    apiReceipt.address,
    apiReceipt.state,
    apiReceipt.city,
    apiReceipt.municipality,
    apiReceipt.postal_code,
    apiReceipt.delivery_id
  );
}

function adaptDeliveryTimeLine(apiTimeLine: any): DeliveryTimeLine {
  return new DeliveryTimeLine(
    apiTimeLine.id,
    apiTimeLine.event,
    apiTimeLine.section,
    apiTimeLine.reference_table,
    apiTimeLine.reference_id,
    apiTimeLine.created_at
  );
}

export function adaptDelivery(apiData: any): Delivery {
  return new Delivery(
    apiData.id,
    apiData.number,
    apiData.date,
    apiData.status as DeliveryStatus,
    apiData.payment_type as PaymentType,
    apiData.notes ?? '',
    adaptService(apiData.service),
    adaptClient(apiData.client),
    adaptClientAddress(apiData.client_address),
    adaptCourier(apiData.courier),
    Array.isArray(apiData.time_line) ? apiData.time_line.map(adaptDeliveryTimeLine) : [],
    adaptDeliveryReceipt(apiData.receipt),
    Array.isArray(apiData.client_payments)
      ? apiData.client_payments.map(adaptDeliveryClientPayment)
      : [],
    Array.isArray(apiData.courier_payments)
      ? apiData.courier_payments.map(adaptDeliveryCourierPayment)
      : [],
    apiData.created_at,
    apiData.updated_at
  );
}

export function adaptDeliveryForApi(delivery: Delivery): any {
  return {
    id: delivery.getId(),
    number: delivery.getNumber(),
    date: delivery.getDate(),
    status: delivery.getStatus(),
    paymentType: delivery.getPaymentType(),
    notes: delivery.getNotes(),
    service: delivery.getService(),
    client: delivery.getClient(),
    clientAddress: delivery.getClientAddress(),
    courier: delivery.getCourier(),
    timeLine: delivery.getTimeLine(),
    receipt: delivery.getReceipt(),
    clientPayments: delivery.getClientPayments(),
    courierPayments: delivery.getCourierPayments(),
    createdAt: delivery.getCreatedAt(),
    updatedAt: delivery.getUpdatedAt(),
  };
}
