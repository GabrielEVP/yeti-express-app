export class ClientEmail {
  private readonly id: string;
  private readonly email: string;

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }
}
