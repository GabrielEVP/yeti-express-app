export class ClientPhone {
  private readonly id: string;
  private readonly phone: string;

  constructor(id: string, phone: string) {
    this.id = id;
    this.phone = phone;
  }

  getId(): string {
    return this.id;
  }

  getPhone(): string {
    return this.phone;
  }
}
