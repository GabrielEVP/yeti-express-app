import {
  PaymentMethod,
  formatPaymentMethod,
} from '@views/company-bills/domain/enums/PaymentMethod';

export class CompanyBill {
  private readonly id: string;
  private date: Date;
  private name: string;
  private description: string;
  private method: PaymentMethod;
  private amount: number;
  private userId: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    date: Date,
    name: string,
    description: string,
    method: PaymentMethod,
    amount: number,
    userId: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.date = date;
    this.name = name;
    this.description = description;
    this.method = method;
    this.amount = amount;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }
  getDate(): Date {
    return this.date;
  }
  getName(): string {
    return this.name;
  }
  getDescription(): string {
    return this.description;
  }
  getMethod(): PaymentMethod {
    return this.method;
  }
  getFormattedMethod(): string {
    return formatPaymentMethod(this.method);
  }
  getAmount(): number {
    return this.amount;
  }
  getUserId(): string {
    return this.userId;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
