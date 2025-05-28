export class DeliveryTimeLine {
  private readonly id: string;
  private readonly event: string;
  private readonly section: string;
  private readonly referenceTable: string;
  private readonly referenceId: string;
  private readonly createdAt: Date;

  constructor(
    id: string,
    event: string,
    section: string,
    referenceTable: string,
    referenceId: string,
    createdAt: Date | string
  ) {
    this.id = id;
    this.event = event;
    this.section = section;
    this.referenceTable = referenceTable;
    this.referenceId = referenceId;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
  }

  getId(): string {
    return this.id;
  }

  getEvent(): string {
    return this.event;
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

  getCreatedAtFormatted(locale: string = 'es-AR'): string {
    return this.createdAt.toLocaleString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
