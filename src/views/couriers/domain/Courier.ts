import { TimeLineContent } from '@time-line-content/domain';
import { Delivery, DeliveryStatus } from '@views/deliveries';
import dayjs from 'dayjs';

export class Courier {
  readonly id: string;
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly phone: string;
  private readonly active: boolean;
  private readonly timeLineContent: TimeLineContent[];
  private readonly deliveries: Delivery[];
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

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
    return this.deliveries.filter((delivery) => delivery.getStatus() !== DeliveryStatus.DELIVERED);
  }

  getDeliveredDeliveries(): Delivery[] {
    return this.deliveries.filter((delivery) => delivery.getStatus() === DeliveryStatus.DELIVERED);
  }

  getDeliveredThisMonth(): Delivery[] {
    const now = dayjs();

    return this.deliveries.filter((delivery) => {
      const deliveryDate = dayjs(delivery.getUpdatedAt());
      delivery.getStatus() === DeliveryStatus.DELIVERED &&
        deliveryDate.month() === now.month() &&
        deliveryDate.year() === now.year();
    });
  }
  getPendingOrTransitThisMonth(): Delivery[] {
    return this.deliveries.filter((delivery) => {
      delivery.getStatus() === DeliveryStatus.PENDING ||
        delivery.getStatus() === DeliveryStatus.IN_TRANSIT;
    });
  }
}
