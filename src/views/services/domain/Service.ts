import { Bill } from '@views/services/domain/Bill';

export class Service {
  readonly id: string;
  private name: string;
  private description: string;
  private amount: number;
  private comision: number;
  private active: boolean;
  private createdAt: Date;
  private updatedAt: Date;
  private bills: Bill[] = [];

  constructor(
    id: string,
    name: string,
    description: string,
    amount: number,
    comision: number,
    active: boolean,
    createdAt: Date,
    updatedAt: Date,
    bills: Bill[] = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.comision = comision;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.bills = bills;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getAmount(): number {
    return this.amount;
  }

  getComision(): number {
    return this.comision;
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

  getBills(): Bill[] {
    return this.bills;
  }

  addBill(bill: Bill): void {
    this.bills.push(bill);
  }

  removeBill(billId: string): void {
    this.bills = this.bills.filter((bill) => bill.getId() !== billId);
  }

  clearBills(): void {
    this.bills = [];
  }

  getTotalExpense(): number {
    return this.bills.reduce((total, bill) => total + bill.getAmount(), 0);
  }

  getTotalEarning(): number {
    return this.amount - this.getTotalExpense();
  }

  getEarningPercentage(): number {
    if (this.amount === 0) return 0;
    return (this.getTotalEarning() / this.amount) * 100;
  }
}
