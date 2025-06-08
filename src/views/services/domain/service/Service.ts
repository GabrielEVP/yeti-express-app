import { Bill } from '@views/services/domain/bill/Bill';
import { TimeLineContent } from '@/time-line-content/domain';

export class Service {
  private readonly id: string;
  private readonly name: string;
  private readonly description: string;
  private readonly amount: number;
  private readonly comision: number;
  private readonly active: boolean;
  private readonly timeLineContent: TimeLineContent[];
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly bills: Bill[] = [];

  constructor(
    id: string,
    name: string,
    description: string,
    amount: number,
    comision: number,
    active: boolean,
    timeLineContent: TimeLineContent[],
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
    this.timeLineContent = timeLineContent;
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
    return Number(this.comision);
  }

  isActive(): boolean {
    return this.active;
  }

  getTimeLineContent(): TimeLineContent[] {
    return [...this.timeLineContent];
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

  getTotalExpense(): number {
    const totalBills = this.bills.reduce((total, bill) => total + bill.getAmount(), 0);
    console.log(totalBills);
    const totalExpense = totalBills + this.getComision();
    return totalExpense;
  }

  getTotalEarning(): number {
    return this.amount - this.getTotalExpense();
  }

  getEarningPercentage(): number {
    if (this.amount === 0) return 0;
    return (this.getTotalEarning() / this.amount) * 100;
  }
}
