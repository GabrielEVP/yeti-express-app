import {
  Delivery,
  DeliveryEvent,
  DeliveryLine,
  DeliveryReceipt,
  DeliveryClientPayment,
  DeliveryCourierPayment,
} from '@views/deliveries/models/Delivery';
import { adaptEvents, adaptEventsForApi } from '@/adapters/';

export function adaptDelivery(apiData: any): Delivery {
  return {
    id: apiData.id,
    number: apiData.number,
    date: apiData.date,
    status: apiData.status as 'pending' | 'paid' | 'refused',
    paymentType: apiData.payment_type as 'partial' | 'full',
    notes: apiData.notes,
    serviceId: apiData.service_id,
    clientId: apiData.client_id,
    clientAddressId: apiData.client_address_id,
    courierId: apiData.courier_id,
    openBoxId: apiData.open_box_id,
    closeBoxId: apiData.close_box_id,
    userId: apiData.user_id,
    createdAt: apiData.created_at,
    updatedAt: apiData.updated_at,
    events: Array.isArray(apiData.events) ? apiData.events.map(adaptDeliveryEvent) : [],
    lines: Array.isArray(apiData.lines) ? apiData.lines.map(adaptLine) : [],
    clientPayments: Array.isArray(apiData.client_payments)
      ? apiData.payments.map(adaptClientPayment)
      : [],
    courierPayments: Array.isArray(apiData.courier_payments)
      ? apiData.payments.map(adaptCourierPayment)
      : [],
    receipt: adaptReceipt(apiData.receipt),
  };
}

export function adaptDeliveryForApi(delivery: Delivery): any {
  return {
    id: delivery.id,
    number: delivery.number,
    date: delivery.date,
    status: delivery.status,
    payment_type: delivery.paymentType,
    notes: delivery.notes,
    service_id: delivery.serviceId,
    client_id: delivery.clientId,
    client_address_id: delivery.clientAddressId,
    courier_id: delivery.courierId,
    open_box_id: delivery.openBoxId,
    close_box_id: delivery.closeBoxId,
    user_id: delivery.userId,
    events: delivery.events.map(adaptDeliveryEventForApi),
    lines: delivery.lines.map(adaptLineForApi),
    clientPayments: delivery.clientPayments.map(adaptClientPaymentForApi),
    courierPayments: delivery.courierPayments.map(adaptCourierPaymentForApi),
    receipt: adaptReceiptForApi(delivery.receipt),
  };
}

export function adaptDeliveryEvent(apiEvent: any): DeliveryEvent {
  return {
    ...adaptEvents(apiEvent),
    deliveryId: apiEvent.delivery_id,
  };
}

export function adaptDeliveryEventForApi(event: DeliveryEvent): any {
  return {
    ...adaptEventsForApi(event),
    delivery_id: event.deliveryId,
  };
}

export function adaptLine(apiLine: any): DeliveryLine {
  return {
    id: apiLine.id,
    description: apiLine.description,
    quantity: apiLine.quantity,
    unitPrice: apiLine.unit_price,
    total: apiLine.total,
    deliveryId: apiLine.delivery_id,
    userId: apiLine.user_id,
  };
}

export function adaptLineForApi(line: DeliveryLine): any {
  return {
    id: line.id,
    description: line.description,
    quantity: line.quantity,
    unit_price: line.unitPrice,
    total: line.total,
    delivery_id: line.deliveryId,
    user_id: line.userId,
  };
}

export function adaptReceipt(apiReceipt: any): DeliveryReceipt {
  return {
    id: apiReceipt.id,
    fullName: apiReceipt.full_name,
    phone: apiReceipt.phone,
    address: apiReceipt.address,
    state: apiReceipt.state,
    city: apiReceipt.city,
    municipality: apiReceipt.municipality,
    postalCode: apiReceipt.postal_code,
    deliveryId: apiReceipt.delivery_id,
    userId: apiReceipt.user_id,
  };
}

export function adaptReceiptForApi(receipt: DeliveryReceipt): any {
  return {
    id: receipt.id,
    full_name: receipt.fullName,
    phone: receipt.phone,
    address: receipt.address,
    state: receipt.state,
    city: receipt.city,
    municipality: receipt.municipality,
    postal_code: receipt.postalCode,
    user_id: receipt.userId,
  };
}

export function adaptClientPayment(apiPayment: any): DeliveryClientPayment {
  return {
    id: apiPayment.id,
    date: apiPayment.date,
    amount: apiPayment.amount,
    deliveryId: apiPayment.delivery_id,
    method: apiPayment.method,
    userId: apiPayment.user_id,
  };
}

export function adaptClientPaymentForApi(payment: DeliveryClientPayment): any {
  return {
    id: payment.id,
    date: payment.date,
    amount: payment.amount,
    delivery_id: payment.deliveryId,
    method: payment.method,
    user_id: payment.userId,
  };
}

export function adaptCourierPayment(apiPayment: any): DeliveryCourierPayment {
  return {
    id: apiPayment.id,
    date: apiPayment.date,
    amount: apiPayment.amount,
    deliveryId: apiPayment.delivery_id,
    method: apiPayment.method,
    userId: apiPayment.user_id,
  };
}

export function adaptCourierPaymentForApi(payment: DeliveryCourierPayment): any {
  return {
    id: payment.id,
    date: payment.date,
    amount: payment.amount,
    delivery_id: payment.deliveryId,
    method: payment.method,
    user_id: payment.userId,
  };
}
