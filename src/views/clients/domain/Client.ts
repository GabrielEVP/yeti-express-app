import { ClientAddress } from './ClientAddress';
import { ClientPhone } from './ClientPhone';
import { ClientEmail } from './ClientEmail';
import { ClientType } from './Type';
import { Delivery, DeliveryStatus } from '@views/deliveries';
import { TimeLineContent } from '@time-line-content/domain';
import dayjs from 'dayjs';

export class Client {
  private readonly id: string;
  private legalName: string;
  private type: ClientType;
  private registrationNumber: string;
  private notes: string;
  private events: TimeLineContent[];
  private addresses: ClientAddress[];
  private emails: ClientEmail[];
  private phones: ClientPhone[];
  private readonly deliveries: Delivery[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    legalName: string,
    type: ClientType.VENEZOLANO,
    registrationNumber: string,
    notes: string,
    events: TimeLineContent[],
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
    this.events = events;
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
  getEvents(): TimeLineContent[] {
    return [...this.events];
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
