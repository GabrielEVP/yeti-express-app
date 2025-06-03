export class Bill {
  private id: string;
  private name: string;
  private amount: number;

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
    return this.amount;
  }
}
