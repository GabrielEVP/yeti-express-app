import { DeliveryStatus } from '@/views/deliveries/domain/Status';
import { PaymentType } from '@/views/deliveries/domain/PaymentType';
import { TimeLineContent } from '@time-line-content/domain';
import { DeliveryReceipt } from '@/views/deliveries/domain/DeliveryReceipt';
import { DeliveryClientPayment } from '@/views/deliveries/domain/DeliveryClientPayment';
import { DeliveryCourierPayment } from '@/views/deliveries/domain/DeliveryCourierPayment';
import { Service } from '@/views/services';
import { Client, ClientAddress } from '@/views/clients/domain/';
import { Courier } from '@/views/couriers/domain/';

export class Delivery {
  private readonly id: string;
  private number: string;
  private date: Date;
  private status: DeliveryStatus;
  private paymentType: PaymentType;
  private notes: string;
  private readonly service: Service;
  private readonly client: Client;
  private readonly clientAddress: ClientAddress;
  private readonly courier: Courier;
  private readonly timeLine: TimeLineContent[];
  private receipt: DeliveryReceipt;
  private clientPayments: DeliveryClientPayment[];
  private courierPayments: DeliveryCourierPayment[];
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private clientId: string;
  private courierId: string;
  private serviceId: string;
  private clientAddressId: string;

  constructor(
    id: string,
    number: string,
    date: Date | string,
    status: DeliveryStatus,
    paymentType: PaymentType,
    notes: string,
    service: Service,
    client: Client,
    clientAddress: ClientAddress,
    courier: Courier,
    timeLine: TimeLineContent[],
    receipt: DeliveryReceipt,
    clientPayments: DeliveryClientPayment[],
    courierPayments: DeliveryCourierPayment[],
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
    this.notes = notes;
    this.service = service;
    this.client = client;
    this.clientAddress = clientAddress;
    this.courier = courier;
    this.timeLine = timeLine;
    this.receipt = receipt;
    this.clientPayments = clientPayments;
    this.courierPayments = courierPayments;
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
    return [...this.timeLine];
  }

  getReceipt(): DeliveryReceipt {
    return this.receipt;
  }

  getClientPayments(): DeliveryClientPayment[] {
    return [...this.clientPayments];
  }

  getCourierPayments(): DeliveryCourierPayment[] {
    return [...this.courierPayments];
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

  getRemainingToPay(): number {
    const totalPaid = this.clientPayments.reduce((sum, payment) => sum + payment.getAmount(), 0);
    const totalComision = this.service.getComision();
    return Math.max(totalComision - totalPaid, 0);
  }

  getRemainingToCollect(): number {
    const totalCollected = this.courierPayments.reduce(
      (sum, payment) => sum + payment.getAmount(),
      0
    );
    const earning = this.service.getTotalEarning();
    return Math.max(earning - totalCollected, 0);
  }
}
