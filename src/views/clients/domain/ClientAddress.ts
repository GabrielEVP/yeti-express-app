export class ClientAddress {
  private readonly id: string;
  private readonly address: string;

  constructor(id: string, address: string) {
    this.id = id;
    this.address = address;
  }

  getId(): string {
    return this.id;
  }

  getAddress(): string {
    return this.address;
  }
}
