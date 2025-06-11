import { DeliveryStatus, getDeliveryStatusLabel } from '@/views/deliveries/domain/enum/';
import { PaymentType, getPaymentTypeLabel } from '@/views/deliveries/domain/enum/';
import { TimeLineContent } from '@time-line-content/domain';
import { DeliveryReceipt } from '@views/deliveries/domain/DeliveryReceipt';
import { Service } from '@/views/services';
import { Client, ClientAddress } from '@/views/clients/domain/';
import { Courier } from '@/views/couriers/domain/';
import {
  DeliveryPaymentStatus,
  getDeliveryPaymentStatusLabel,
} from '@/views/deliveries/domain/enum/';
import { Debt } from '@/views/debts/domain';

export class Delivery {
  private readonly id: string;
  private readonly number: string;
  private readonly date: Date;
  private readonly status: DeliveryStatus;
  private paymentType: PaymentType;
  private readonly paymentStatus: DeliveryPaymentStatus;
  private readonly notes: string;
  private readonly amount: number;
  private readonly service: Service;
  private readonly client: Client | null;
  private readonly clientAddress: ClientAddress | null;
  private readonly courier: Courier | null;
  private readonly timeLineContent: TimeLineContent[] | null;
  private readonly receipt: DeliveryReceipt | null;
  private readonly debts: Debt | null;
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
    amount: number,
    service: Service,
    client: Client | null,
    clientAddress: ClientAddress | null,
    courier: Courier | null,
    timeLineContent: TimeLineContent[],
    receipt: DeliveryReceipt | null,
    debts: Debt | null,
    createdAt: Date | string,
    updatedAt: Date | string,
    serviceId: string,
    clientId: string,
    clientAddressId: string,
    courierId: string
  ) {
    this.id = id;
    this.number = number;
    this.date = this.parseDate(date);
    this.status = status;
    this.paymentType = paymentType;
    this.paymentStatus = paymentStatus;
    this.notes = notes;
    this.amount = amount;
    this.service = service;
    this.client = client ?? null;
    this.clientAddress = clientAddress;
    this.courier = courier;
    this.timeLineContent = timeLineContent;
    this.receipt = receipt ?? null;
    this.debts = debts;
    this.createdAt = this.parseDate(createdAt);
    this.updatedAt = this.parseDate(updatedAt);
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

  getAmount(): number {
    return this.amount;
  }

  getService(): Service {
    return this.service;
  }

  setPaymentType(paymentType: PaymentType): void {
    this.paymentType = paymentType;
  }

  getClient(): Client | null {
    return this.client;
  }

  getClientAddress(): ClientAddress | null {
    return this.clientAddress;
  }

  getCourier(): Courier | null {
    return this.courier;
  }

  getTimeLine(): TimeLineContent[] | null {
    return this.timeLineContent ? [...this.timeLineContent] : null;
  }

  getReceipt(): DeliveryReceipt | null {
    return this.receipt;
  }

  getDebts(): Debt | null {
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

  getClientAddressId(): string | null {
    return this.clientAddressId;
  }

  getStatusToFormat(): string {
    return getDeliveryStatusLabel(this.status);
  }

  getPaymentTypeToFormat(): string {
    return getPaymentTypeLabel(this.paymentType);
  }

  getPaymentStatusToFormat(): string {
    return getDeliveryPaymentStatusLabel(this.paymentStatus);
  }

  getRemainingToCollect(): number {
    return 0;
  }
  private parseDate(dateValue: Date | string): Date {
    if (dateValue instanceof Date) {
      return isNaN(dateValue.getTime()) ? new Date() : dateValue;
    }

    if (typeof dateValue === 'string' && dateValue.trim() !== '') {
      const parsed = new Date(dateValue);
      return isNaN(parsed.getTime()) ? new Date() : parsed;
    }

    // Si es string vacío o inválido, usa fecha actual
    return new Date();
  }
}
