export class DeliveryReceipt {
  private readonly id: string;
  private fullName: string;
  private phone: string;
  private address: string;

  constructor(id: string, fullName: string, phone: string, address: string) {
    this.id = id;
    this.fullName = fullName;
    this.phone = phone;
    this.address = address;
  }

  getId(): string {
    return this.id;
  }
  getFullName(): string {
    return this.fullName;
  }
  getPhone(): string {
    return this.phone;
  }
  getAddress(): string {
    return this.address;
  }
}
