export class TimeLineContent {
  private readonly id: string;
  private readonly event: string;
  private readonly referenceTable: string;
  private readonly referenceId: string;
  private readonly createdAt: Date;

  constructor(
    id: string,
    event: string,
    referenceTable: string,
    referenceId: string,
    createdAt: string | Date
  ) {
    this.id = id;
    this.event = event;
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
