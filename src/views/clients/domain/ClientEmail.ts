export class ClientEmail {
  private readonly id: string;
  private email: string;

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

  setEmail(newEmail: string): void {
    this.email = newEmail;
  }
}
