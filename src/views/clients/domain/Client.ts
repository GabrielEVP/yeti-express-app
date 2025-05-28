import { ClientAddress } from './ClientAddress';
import { ClientPhone } from './ClientPhone';
import { ClientEmail } from './ClientEmail';
import { ClientTimeLine } from './ClientTimeLine';
import { ClientType } from './Type';
import { Delivery } from '@views/deliveries';

export class Client {
  private readonly id: string;
  private legalName: string;
  private type: ClientType;
  private registrationNumber: string;
  private notes: string;
  private events: ClientTimeLine[];
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
    events: ClientTimeLine[],
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
  getEvents(): ClientTimeLine[] {
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
  addEvent(event: ClientTimeLine): void {
    this.events.push(event);
  }
}
