import dayjs from 'dayjs';
import { ClientAddress } from '@/views/clients/domain/ClientAddress';
import { ClientPhone } from '@/views/clients/domain/ClientPhone';
import { ClientEmail } from '@/views/clients/domain/ClientEmail';
import { ClientType, formatClientType } from '@/views/clients/domain/Type';
import { TimeLineContent } from '@/time-line-content/domain';
import { Delivery, DeliveryStatus } from '@/views/deliveries/domain';

export class Client {
  private readonly id: string;
  private readonly legalName: string;
  private readonly type: ClientType;
  private readonly registrationNumber: string;
  private readonly notes: string;
  private readonly timeLineContent: TimeLineContent[];
  private readonly addresses: ClientAddress[];
  private readonly emails: ClientEmail[];
  private readonly phones: ClientPhone[];
  private readonly deliveries: Delivery[];
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(
    id: string,
    legalName: string,
    type: ClientType.VENEZOLANO,
    registrationNumber: string,
    notes: string,
    timeLineContent: TimeLineContent[],
    addresses: ClientAddress[],
    emails: ClientEmail[],
    phones: ClientPhone[],
    deliveries: Delivery[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.legalName = legalName;
    this.type = type;
    this.registrationNumber = registrationNumber;
    this.notes = notes;
    this.timeLineContent = timeLineContent;
    this.addresses = addresses;
    this.emails = emails;
    this.phones = phones;
    this.deliveries = deliveries;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }
  getLegalName(): string {
    return this.legalName;
  }
  getType(): string {
    return this.type;
  }
  getRegistrationNumber(): string {
    return this.registrationNumber;
  }
  getNotes(): string {
    return this.notes;
  }
  getTimeLineContent(): TimeLineContent[] {
    return [...this.timeLineContent];
  }
  getAddresses(): ClientAddress[] {
    return [...this.addresses];
  }
  getEmails(): ClientEmail[] {
    return [...this.emails];
  }
  getPhones(): ClientPhone[] {
    return [...this.phones];
  }
  getDeliveries(): Delivery[] {
    return [...this.deliveries];
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getFormatType(): string {
    return formatClientType(this.type);
  }

  getEarningsDelivery(): number {
    let earning = 0;

    for (const delivery of this.getDeliveries()) {
      const isPaid = delivery.getStatus() === DeliveryStatus.PAID;

      if (isPaid) {
        earning += delivery.getService().getTotalEarning();
      }
    }

    return earning;
  }

  getEarningsDeliveryOfCurrentMonth(): number {
    let earningOfMonth = 0;
    const currentMonth = dayjs().month();
    const currentYear = dayjs().year();

    for (const delivery of this.getDeliveries()) {
      const deliveryDate = dayjs(delivery.getDate());
      const deliveryMonth = deliveryDate.month();
      const deliveryYear = deliveryDate.year();

      const isCurrentMonth = deliveryMonth === currentMonth && deliveryYear === currentYear;
      const isPaid = delivery.getStatus() === DeliveryStatus.PAID;

      if (isCurrentMonth && isPaid) {
        earningOfMonth += delivery.getService().getTotalEarning();
      }
    }

    return earningOfMonth;
  }

  getEarningsPendingOfDeliveries(): number {
    let pendingEarning = 0;

    for (const delivery of this.getDeliveries()) {
      if (delivery.getStatus() === DeliveryStatus.PENDING) {
        pendingEarning += delivery.getService().getTotalEarning();
      }
    }

    return pendingEarning;
  }

  getPendingDeliveries(): Delivery[] {
    let pendingDeliveries: Delivery[] = [];

    for (const delivery of this.getDeliveries()) {
      if (delivery.getStatus() === DeliveryStatus.PENDING) {
        pendingDeliveries.push(delivery);
      }
    }

    return pendingDeliveries;
  }

  getPendingLenghtDeliveries(): number {
    let deliveries = 0;

    for (const delivery of this.getDeliveries()) {
      if (delivery.getStatus() === DeliveryStatus.PENDING) {
        deliveries++;
      }
    }

    return deliveries;
  }
}
