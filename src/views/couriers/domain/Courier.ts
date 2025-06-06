import { TimeLineContent } from '@time-line-content/domain';
import { Delivery } from '@views/deliveries';
import { DeliveryPaymentStatus } from '@views/deliveries/domain';
import dayjs from 'dayjs';

export class Courier {
  readonly id: string;
  private firstName: string;
  private lastName: string;
  private phone: string;
  private active: boolean;
  private readonly timeLineContent: TimeLineContent[];
  private readonly deliveries: Delivery[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    active: boolean,
    timeLineContent: TimeLineContent[],
    deliveries: Delivery[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.active = active;
    this.timeLineContent = timeLineContent;
    this.deliveries = deliveries;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getPhone(): string {
    return this.phone;
  }

  isActive(): boolean {
    return this.active;
  }

  getTimeLineContent(): TimeLineContent[] {
    return this.timeLineContent;
  }

  getDeliveries(): Delivery[] {
    return this.deliveries;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getPendingDeliveries(): Delivery[] {
    return this.deliveries.filter(
      (delivery) => delivery.getPaymentStatus() !== DeliveryPaymentStatus.PAID
    );
  }

  getTotalPaid(): number {
    return this.deliveries
      .filter((delivery) => delivery.getPaymentStatus() === DeliveryPaymentStatus.PAID)
      .reduce((sum, delivery) => sum + delivery.getService().getComision(), 0);
  }

  getTotalPendingToPay(): number {
    return 0;
  }

  getDeliveredOrders(): Delivery[] {
    return this.deliveries.filter(
      (delivery) => delivery.getPaymentStatus() === DeliveryPaymentStatus.PAID
    );
  }

  getPaidAmountThisMonth(): number {
    const now = dayjs();

    return this.deliveries
      .filter((delivery) => {
        const deliveryDate = dayjs(delivery.getUpdatedAt());
        return (
          delivery.getPaymentStatus() === DeliveryPaymentStatus.PAID &&
          deliveryDate.month() === now.month() &&
          deliveryDate.year() === now.year()
        );
      })
      .reduce((sum, delivery) => sum + delivery.getService().getComision(), 0);
  }
}
