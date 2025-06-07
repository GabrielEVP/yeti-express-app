import { DeliveryStatus, getDeliveryStatusLabel } from '@/views/deliveries/domain/enum/';
import { PaymentType, getPaymentTypeLabel } from '@/views/deliveries/domain/enum/';
import { TimeLineContent } from '@time-line-content/domain';
import { DeliveryReceipt } from '@views/deliveries/domain/DeliveryReceipt';
import { Service } from '@/views/services';
import { Client, ClientAddress } from '@/views/clients/domain/';
import { Courier } from '@/views/couriers/domain/';
import { DeliveryPaymentStatus } from '@/views/deliveries/domain/enum/';
import { Debt } from '@/views/debts/domain';

export class Delivery {
  private readonly id: string;
  private readonly number: string;
  private readonly date: Date;
  private readonly status: DeliveryStatus;
  private readonly paymentType: PaymentType;
  private readonly paymentStatus: DeliveryPaymentStatus;
  private readonly notes: string;
  private readonly service: Service;
  private readonly client: Client;
  private readonly clientAddress: ClientAddress;
  private readonly courier: Courier;
  private readonly timeLineContent: TimeLineContent[];
  private readonly receipt: DeliveryReceipt;
  private readonly debts: Debt[];
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly clientId: string;
  private readonly courierId: string;
  private readonly serviceId: string;
  private readonly clientAddressId: string;

  constructor(
    id: string,
    number: string,
    date: Date | string,
    status: DeliveryStatus,
    paymentType: PaymentType,
    paymentStatus: DeliveryPaymentStatus,
    notes: string,
    service: Service,
    client: Client,
    clientAddress: ClientAddress,
    courier: Courier,
    timeLineContent: TimeLineContent[],
    receipt: DeliveryReceipt,
    debts: Debt[],
    createdAt: Date | string,
    updatedAt: Date | string,
    serviceId: string,
    clientId: string,
    clientAddressId: string,
    courierId: string
  ) {
    this.id = id;
    this.number = number;
    this.date = typeof date === 'string' ? new Date(date) : date;
    this.status = status;
    this.paymentType = paymentType;
    this.paymentStatus = paymentStatus;
    this.notes = notes;
    this.service = service;
    this.client = client;
    this.clientAddress = clientAddress;
    this.courier = courier;
    this.timeLineContent = timeLineContent;
    this.receipt = receipt;
    this.debts = debts;
    this.createdAt = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
    this.updatedAt = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt;
    this.serviceId = serviceId;
    this.clientId = clientId;
    this.clientAddressId = clientAddressId;
    this.courierId = courierId;
  }

  getId(): string {
    return this.id;
  }

  getNumber(): string {
    return this.number;
  }

  getDate(): Date {
    return this.date;
  }

  getStatus(): DeliveryStatus {
    return this.status;
  }

  getPaymentStatus(): DeliveryPaymentStatus {
    return this.paymentStatus;
  }

  getPaymentType(): PaymentType {
    return this.paymentType;
  }

  getNotes(): string {
    return this.notes;
  }

  getService(): Service {
    return this.service;
  }

  getClient(): Client {
    return this.client;
  }

  getClientAddress(): ClientAddress {
    return this.clientAddress;
  }

  getCourier(): Courier {
    return this.courier;
  }

  getTimeLine(): TimeLineContent[] {
    return [...this.timeLineContent];
  }

  getReceipt(): DeliveryReceipt {
    return this.receipt;
  }

  getDebts(): Debt[] {
    return this.debts;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getClientId(): string {
    return this.clientId;
  }

  getCourierId(): string {
    return this.courierId;
  }

  getServiceId(): string {
    return this.serviceId;
  }

  getClientAddressId(): string {
    return this.clientAddressId;
  }

  getStatusToFormat(): string {
    return getDeliveryStatusLabel(this.status);
  }

  getPaymentTypeToFormat(): string {
    return getPaymentTypeLabel(this.paymentType);
  }

  getRemainingToCollect(): number {
    return 0;
  }
}
