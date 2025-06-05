import dayjs from 'dayjs';
import { ClientAddress } from '@/views/clients/domain/';
import { ClientPhone } from '@/views/clients/domain/';
import { ClientEmail } from '@/views/clients/domain/';
import { ClientType, formatClientType } from '@/views/clients/domain/';
import { Debt } from '@/views/debts/domain';
import { Delivery, DeliveryStatus } from '@/views/deliveries/domain';
import { TimeLineContent } from '@/time-line-content/domain';

export class Client {
  private readonly id: string;
  private readonly legalName: string;
  private readonly type: ClientType;
  private readonly registrationNumber: string;
  private readonly notes: string;
  private readonly allowCredit: boolean;
  private readonly timeLineContent: TimeLineContent[];
  private readonly addresses: ClientAddress[];
  private readonly emails: ClientEmail[];
  private readonly phones: ClientPhone[];
  private readonly deliveries: Delivery[];
  private readonly debts: Debt[];
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(
    id: string,
    legalName: string,
    type: ClientType,
    registrationNumber: string,
    notes: string,
    allowCredit: boolean,
    timeLineContent: TimeLineContent[],
    addresses: ClientAddress[],
    emails: ClientEmail[],
    phones: ClientPhone[],
    deliveries: Delivery[],
    debts: Debt[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.legalName = legalName;
    this.type = type;
    this.registrationNumber = registrationNumber;
    this.notes = notes;
    this.allowCredit = allowCredit;
    this.timeLineContent = timeLineContent;
    this.addresses = addresses;
    this.emails = emails;
    this.phones = phones;
    this.deliveries = deliveries;
    this.debts = debts;
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

  getAllowCredit(): boolean {
    return this.allowCredit;
  }

  canPayWithCredit(): boolean {
    return this.allowCredit;
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

  getDeliveryDebt(): Debt[] {
    return [...this.debts];
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

  getDebtsAmount(): number {
    let totalDebt = 0;
    for (const debt of this.debts) {
    }
    return totalDebt;
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
    }
    return earningOfMonth;
  }

  getEarningsPendingOfDeliveries(): number {
    let pendingEarning = 0;
    for (const delivery of this.getDeliveries()) {
    }
    return pendingEarning;
  }

  getPendingDeliveries(): Delivery[] {
    let pendingDeliveries: Delivery[] = [];
    for (const delivery of this.getDeliveries()) {
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
