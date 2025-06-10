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
import { Service } from '@/views/services';
import { Client } from '@/views/clients';
import { ClientAddress } from '@/views/clients';
import { Courier } from '@/views/couriers';
import { Debt } from '@/views/debts';
import { TimeLineContent } from '@time-line-content/domain';

export class DeliveryApiAdapter {
  public id: string;
  public number: string;
  public date: Date;
  public status: DeliveryStatus;
  public payment_type: PaymentType;
  public payment_status: DeliveryPaymentStatus;
  public notes: string;
  public amount: number;
  public service: Service;
  public client: Client | null;
  public client_address: ClientAddress | null;
  public courier: Courier | null;
  public events: TimeLineContent[];
  public receipt: DeliveryReceipt | null;
  public debt: Debt | null;
  public created_at: string;
  public updated_at: string;
  public service_id: string;
  public client_id: string;
  public client_address_id: string;
  public courier_id: string;

  constructor(
    id: string,
    number: string,
    date: string,
    status: DeliveryStatus,
    payment_type: PaymentType,
    payment_status: DeliveryPaymentStatus,
    notes: string,
    amount: number,
    service: Service,
    client: Client | null,
    client_address: ClientAddress | null,
    courier: Courier | null,
    events: TimeLineContent[],
    receipt: DeliveryReceipt | null,
    debt: Debt | null,
    created_at: string,
    updated_at: string,
    service_id: string,
    client_id: string,
    client_address_id: string,
    courier_id: string
  ) {
    this.id = id;
    this.number = number;
    this.date = new Date(date);
    this.status = status;
    this.payment_type = payment_type;
    this.payment_status = payment_status;
    this.notes = notes;
    this.amount = amount;
    this.service = service;
    this.client = client;
    this.client_address = client_address;
    this.courier = courier;
    this.events = events;
    this.receipt = receipt;
    this.debt = debt;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.service_id = service_id;
    this.client_id = client_id;
    this.client_address_id = client_address_id;
    this.courier_id = courier_id;
  }

  static fromApi(apiData: any): Delivery | null {
    if (!apiData) return null;

    return new Delivery(
      apiData.id ?? '',
      apiData.number ?? '',
      apiData.date ?? '',
      (apiData.status as DeliveryStatus) ?? DeliveryStatus.PENDING,
      (apiData.payment_type as PaymentType) ?? PaymentType.FULL,
      (apiData.payment_status as DeliveryPaymentStatus) ?? DeliveryPaymentStatus.PENDING,
      apiData.notes ?? '',
      apiData.amount ?? 0,
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
      amount: delivery.getAmount(),
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
      apiData.amount ?? 0,
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
      apiData.amount ?? 0,
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
