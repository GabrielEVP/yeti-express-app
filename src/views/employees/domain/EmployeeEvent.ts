export class EmployeeEvent {
  readonly id: string;
  private eventType: string;
  private section: string;
  private referenceTable: string;
  private referenceId: string;
  private createdAt: Date;
  private employeeId: string;

  constructor(
    id: string,
    eventType: string,
    section: string,
    referenceTable: string,
    referenceId: string,
    createdAt: Date,
    employeeId: string
  ) {
    this.id = id;
    this.eventType = eventType;
    this.section = section;
    this.referenceTable = referenceTable;
    this.referenceId = referenceId;
    this.createdAt = createdAt;
    this.employeeId = employeeId;
  }

  getId(): string {
    return this.id;
  }
  getEventType(): string {
    return this.eventType;
  }
  getSection(): string {
    return this.section;
  }
  getReferenceTable(): string {
    return this.referenceTable;
  }
  getReferenceId(): string {
    return this.referenceId;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getEmployeeId(): string {
    return this.employeeId;
  }
}
