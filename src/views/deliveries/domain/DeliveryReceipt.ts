export class DeliveryReceipt {
  private readonly id: string;
  private fullName: string;
  private phone: string;
  private address: string;
  private state: string;
  private city: string;
  private municipality: string;
  private postalCode: string;
  private deliveryId: string;

  constructor(
    id: string,
    fullName: string,
    phone: string,
    address: string,
    state: string,
    city: string,
    municipality: string,
    postalCode: string,
    deliveryId: string
  ) {
    this.id = id;
    this.fullName = fullName;
    this.phone = phone;
    this.address = address;
    this.state = state;
    this.city = city;
    this.municipality = municipality;
    this.postalCode = postalCode;
    this.deliveryId = deliveryId;
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
  getState(): string {
    return this.state;
  }
  getCity(): string {
    return this.city;
  }
  getMunicipality(): string {
    return this.municipality;
  }
  getPostalCode(): string {
    return this.postalCode;
  }
  getDeliveryId(): string {
    return this.deliveryId;
  }
}
