export class ClientPhone {
  private readonly id: string;
  private phone: string;

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

  setPhone(newPhone: string): void {
    this.phone = newPhone;
  }
}
