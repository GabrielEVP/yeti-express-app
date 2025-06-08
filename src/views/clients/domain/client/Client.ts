import dayjs from 'dayjs';
import { ClientAddress } from '@/views/clients/domain/';
import { ClientPhone } from '@/views/clients/domain/';
import { ClientEmail } from '@/views/clients/domain/';
import { ClientType, formatClientType } from '@/views/clients/domain/';
import { Debt } from '@/views/debts/domain';
import { Delivery, DeliveryStatus, DeliveryPaymentStatus } from '@/views/deliveries/domain';
import { TimeLineContent } from '@/time-line-content/domain';
import { DebtStatus } from '@/views/debts/domain';

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

  getDeliveredDeliveries(): Delivery[] {
    return this.deliveries.filter((delivery) => delivery.getStatus() === DeliveryStatus.DELIVERED);
  }

  getInTransitDeliveries(): Delivery[] {
    return this.deliveries.filter((delivery) => delivery.getStatus() === DeliveryStatus.IN_TRANSIT);
  }

  getPendingDeliveries(): Delivery[] {
    return this.deliveries.filter((delivery) => delivery.getStatus() === DeliveryStatus.PENDING);
  }

  getRefusedDeliveries(): Delivery[] {
    return this.deliveries.filter((delivery) => delivery.getStatus() === DeliveryStatus.REFUSED);
  }

  getPaidDeliveries(): Delivery[] {
    return this.deliveries.filter(
      (delivery) => delivery.getPaymentStatus() === DeliveryPaymentStatus.PAID
    );
  }

  getTotalInvoiced(): number {
    return this.deliveries.reduce((total, delivery) => {
      return total + delivery.getService().getAmount();
    }, 0);
  }

  getEarningsDelivery(): number {
    return this.getDeliveries().reduce((total, delivery) => {
      return delivery.getPaymentStatus() === DeliveryPaymentStatus.PAID
        ? total + delivery.getService().getTotalEarning()
        : total;
    }, 0);
  }

  getPendingEarnings(): number {
    return this.getDeliveries().reduce((total, delivery) => {
      return delivery.getPaymentStatus() !== DeliveryPaymentStatus.PAID
        ? total + delivery.getService().getTotalEarning()
        : total;
    }, 0);
  }

  getEarningsDeliveryOfCurrentMonth(): number {
    const currentMonth = dayjs().month();
    const currentYear = dayjs().year();

    return this.getDeliveries().reduce((total, delivery) => {
      const deliveryDate = dayjs(delivery.getDate());
      const isPaid = delivery.getPaymentStatus() === DeliveryPaymentStatus.PAID;
      const isSameMonthAndYear =
        deliveryDate.month() === currentMonth && deliveryDate.year() === currentYear;

      return isPaid && isSameMonthAndYear ? total + delivery.getService().getTotalEarning() : total;
    }, 0);
  }

  getDebtsTotalAmount(): number {
    return this.debts.reduce((total, debt) => {
      const status = debt.getStatus();
      return status === DebtStatus.PENDING || status === DebtStatus.PARTIAL_PAID
        ? total + debt.getAmount()
        : total;
    }, 0);
  }

  getDebtsPaidAmount(): number {
    return this.debts.reduce((total, debt) => {
      return debt.getStatus() === DebtStatus.PAID ? total + debt.getAmount() : total;
    }, 0);
  }
}
