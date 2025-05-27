export class Courier {
  readonly id: string;
  private firstName: string;
  private lastName: string;
  private phone: string;
  private active: boolean;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    active: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.active = active;
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
  getPhone() {
    return this.phone;
  }
  isActive(): boolean {
    return this.active;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
