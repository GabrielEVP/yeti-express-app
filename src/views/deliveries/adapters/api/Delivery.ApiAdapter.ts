import { Delivery } from '@/views/deliveries/domain/Delivery';
import {
  DeliveryStatus,
  PaymentType,
  DeliveryPaymentStatus,
} from '@/views/deliveries/domain/enum/';
import { DeliveryReceipt } from '@/views/deliveries/domain/DeliveryReceipt';
import { ClientApiAdapter, ClientAddressApiAdapter } from '@/views/clients/adapters/';
import { adaptCourier } from '@/views/couriers/';
import { ServiceApiAdapter } from '@/views/services/';
import { adaptTimeLineContent } from '@time-line-content/adapter';
import { DebtApiAdapter } from '@/views/debts/adapter/';

export class DeliveryApiAdapter extends Delivery {
  private static adaptDeliveryReceipt(apiReceipt: any): DeliveryReceipt {
    return new DeliveryReceipt(
      apiReceipt.id,
      apiReceipt.full_name,
      apiReceipt.phone,
      apiReceipt.address
    );
  }

  static fromApi(apiData: any): Delivery {
    return new Delivery(
      apiData.id,
      apiData.number,
      apiData.date,
      apiData.status as DeliveryStatus,
      apiData.payment_type as PaymentType,
      apiData.DeliveryPaymentStatus as DeliveryPaymentStatus,
      apiData.notes ?? '',
      ServiceApiAdapter.fromApi(apiData.service),
      ClientApiAdapter.fromApi(apiData.client),
      ClientAddressApiAdapter.fromApi(apiData.client_address),
      adaptCourier(apiData.courier),
      Array.isArray(apiData.events) ? apiData.events.map(adaptTimeLineContent) : [],
      this.adaptDeliveryReceipt(apiData.receipt),
      DebtApiAdapter.fromApi(apiData.debts),
      apiData.created_at,
      apiData.updated_at,
      apiData.service_id,
      apiData.client_id,
      apiData.client_address_id,
      apiData.courier_id
    );
  }

  static toApi(delivery: Delivery): any {
    return {
      status: delivery.getStatus(),
      payment_type: delivery.getPaymentType(),
      notes: delivery.getNotes(),
      receipt: this.adaptDeliveryReceiptForApi(delivery.getReceipt()),
      client_id: delivery.getClientId(),
      courier_id: delivery.getCourierId(),
      service_id: delivery.getServiceId(),
      client_address_id: delivery.getClientAddressId(),
    };
  }

  private static adaptDeliveryReceiptForApi(deliveryReceipt: DeliveryReceipt): any {
    return {
      id: deliveryReceipt.getId(),
      full_name: deliveryReceipt.getFullName(),
      phone: deliveryReceipt.getPhone(),
      address: deliveryReceipt.getAddress(),
    };
  }

  static fromApiToCourier(apiData: any): Delivery {
    return new Delivery(
      apiData.id,
      apiData.number,
      apiData.date,
      apiData.status as DeliveryStatus,
      apiData.payment_type as PaymentType,
      apiData.payment_status as DeliveryPaymentStatus,
      apiData.notes ?? '',
      ServiceApiAdapter.fromApi(apiData.service),
      null as any,
      null as any,
      null as any,
      [],
      null as any,
      null as any,
      '',
      '',
      '',
      '',
      '',
      ''
    );
  }

  static fromApiToClient(apiData: any): Delivery {
    return new Delivery(
      apiData.id,
      apiData.number,
      apiData.date,
      apiData.status as DeliveryStatus,
      apiData.payment_type as PaymentType,
      apiData.payment_status as DeliveryPaymentStatus,
      apiData.notes ?? '',
      ServiceApiAdapter.fromApi(apiData.service),
      null as any,
      null as any,
      null as any,
      [],
      null as any,
      null as any,
      '',
      '',
      '',
      '',
      '',
      ''
    );
  }
}
