import { Delivery } from '@/views/deliveries/domain/Delivery';
import { DeliveryStatus, DeliveryPaymentStatus } from '@/views/deliveries/domain/enum';
import { ServiceApiAdapter } from '@/views/services/';
import { ClientApiAdapter } from '@/views/clients/adapters/';
import { ClientAddressApiAdapter } from '@/views/clients/adapters/';
import { CourierApiAdapter } from '@/views/couriers/adapters/';
import { DeliveryReceiptApiAdapter } from '@/views/deliveries/adapters/';
import { TimeLineContent } from '@time-line-content/domain';
import { DebtApiAdapter } from '@/views/debts/adapter/';

export class DeliveryApiAdapter {
  id: string = '';
  number: string = '';
  date: string = '';
  status: DeliveryStatus = DeliveryStatus.PENDING;
  paymentType: string = '';
  paymentStatus: DeliveryPaymentStatus = DeliveryPaymentStatus.PENDING;
  notes: string = '';
  service: any = null;
  client: any = null;
  clientAddress: any = null;
  courier: any = null;
  timeLineContent: TimeLineContent[] = [];
  receipt: any = null;
  debts: any = null;
  createdAt: string = '';
  updatedAt: string = '';
  serviceId: string = '';
  clientId: string = '';
  clientAddressId: string = '';
  courierId: string = '';

  static fromApi(data: DeliveryApiAdapter): Delivery | null {
    if (!data) return null;

    return new Delivery(
      data.id,
      data.number,
      new Date(data.date),
      data.status,
      data.paymentType as any,
      data.paymentStatus,
      data.notes,
      ServiceApiAdapter.fromApi(data.service),
      data.client ? ClientApiAdapter.fromApi(data.client) : null,
      data.clientAddress ? ClientAddressApiAdapter.fromApi(data.clientAddress) : null,
      data.courier ? CourierApiAdapter.fromApi(data.courier) : null,
      data.timeLineContent || [],
      data.receipt ? DeliveryReceiptApiAdapter.fromApi(data.receipt) : null,
      data.debts ? DebtApiAdapter.fromApi(data.debts) : null,
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.serviceId,
      data.clientId,
      data.clientAddressId,
      data.courierId
    );
  }

  static toApi(delivery: Delivery): DeliveryApiAdapter {
    return {
      id: delivery.getId(),
      number: delivery.getNumber(),
      date: delivery.getDate().toISOString(),
      status: delivery.getStatus(),
      paymentType: delivery.getPaymentType(),
      paymentStatus: delivery.getPaymentStatus(),
      notes: delivery.getNotes(),
      service: delivery.getService(),
      client: delivery.getClient(),
      clientAddress: delivery.getClientAddress(),
      courier: delivery.getCourier(),
      timeLineContent: delivery.getTimeLine() || [],
      receipt: delivery.getReceipt(),
      debts: delivery.getDebts(),
      createdAt: delivery.getCreatedAt().toISOString(),
      updatedAt: delivery.getUpdatedAt().toISOString(),
      serviceId: delivery.getServiceId(),
      clientId: delivery.getClientId(),
      clientAddressId: delivery.getClientAddressId() || '',
      courierId: delivery.getCourierId(),
    };
  }
}
