export class Bill {
  private readonly id: string;
  private readonly name: string;
  private readonly amount: number;

  constructor(id: string, name: string, amount: number) {
    this.id = id;
    this.name = name;
    this.amount = amount;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getAmount(): number {
    return Number(this.amount);
  }
}
