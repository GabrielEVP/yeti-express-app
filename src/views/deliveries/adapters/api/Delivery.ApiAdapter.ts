import { Delivery } from '@/views/deliveries/domain/Delivery';
import {
  DeliveryStatus,
  PaymentType,
  DeliveryPaymentStatus,
} from '@/views/deliveries/domain/enum/';
import { DeliveryReceiptApiAdapter } from '@/views/deliveries/adapters/';
import { ClientApiAdapter, ClientAddressApiAdapter } from '@/views/clients/adapters/';
import { adaptCourier } from '@/views/couriers/';
import { ServiceApiAdapter } from '@/views/services/';
import { adaptTimeLineContent } from '@time-line-content/adapter';
import { DebtApiAdapter } from '@/views/debts/adapter/';
import { DeliveryReceipt } from '@views/deliveries/domain';

export class DeliveryApiAdapter extends Delivery {
  static fromApi(apiData: any): Delivery | null {
    console.log(apiData);

    if (!apiData) return null;

    return new Delivery(
      apiData.id ?? '',
      apiData.number ?? '',
      apiData.date ?? '',
      (apiData.status as DeliveryStatus) ?? DeliveryStatus.PENDING,
      (apiData.payment_type as PaymentType) ?? PaymentType.FULL,
      (apiData.payment_status as DeliveryPaymentStatus) ?? DeliveryPaymentStatus.PENDING,
      apiData.notes ?? '',
      ServiceApiAdapter.fromApi(apiData.service),
      ClientApiAdapter.fromApi(apiData.client),
      ClientAddressApiAdapter.fromApi(apiData.client_address),
      adaptCourier(apiData.courier),
      Array.isArray(apiData.events) ? apiData.events.map(adaptTimeLineContent) : [],
      DeliveryReceiptApiAdapter.fromApi(apiData.receipt),
      DebtApiAdapter.fromApi(apiData.debt),
      apiData.created_at ?? '',
      apiData.updated_at ?? '',
      apiData.service_id ?? '',
      apiData.client_id ?? '',
      apiData.client_address_id ?? '',
      apiData.courier_id ?? ''
    );
  }

  static toApi(delivery: Delivery): any {
    if (!delivery) return null;

    return {
      status: delivery.getStatus(),
      payment_type: delivery.getPaymentType(),
      notes: delivery.getNotes(),
      receipt: DeliveryReceiptApiAdapter.toApi(delivery.getReceipt() as DeliveryReceipt),
      client_id: delivery.getClientId(),
      courier_id: delivery.getCourierId(),
      service_id: delivery.getServiceId(),
      client_address_id: delivery.getClientAddressId(),
    };
  }

  static fromApiToCourier(apiData: any): Delivery | null {
    if (!apiData) return null;

    return new Delivery(
      apiData.id ?? '',
      apiData.number ?? '',
      apiData.date ?? '',
      (apiData.status as DeliveryStatus) ?? DeliveryStatus.PENDING,
      (apiData.payment_type as PaymentType) ?? PaymentType.FULL,
      (apiData.payment_status as DeliveryPaymentStatus) ?? DeliveryPaymentStatus.PENDING,
      apiData.notes ?? '',
      ServiceApiAdapter.fromApi(apiData.service),
      null,
      null,
      null,
      [],
      null,
      null,
      '',
      '',
      '',
      '',
      '',
      ''
    );
  }

  static fromApiToClient(apiData: any): Delivery | null {
    if (!apiData) return null;

    return new Delivery(
      apiData.id ?? '',
      apiData.number ?? '',
      apiData.date ?? '',
      (apiData.status as DeliveryStatus) ?? DeliveryStatus.PENDING,
      (apiData.payment_type as PaymentType) ?? PaymentType.FULL,
      (apiData.payment_status as DeliveryPaymentStatus) ?? DeliveryPaymentStatus.PENDING,
      apiData.notes ?? '',
      ServiceApiAdapter.fromApi(apiData.service),
      null,
      null,
      null,
      [],
      null,
      null,
      '',
      '',
      '',
      '',
      '',
      ''
    );
  }
}
