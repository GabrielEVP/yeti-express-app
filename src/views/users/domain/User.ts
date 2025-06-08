export class User {
  readonly id: string;
  private name: string;
  private email: string;
  private profile_image: { name: string } | null;
  private password: string;

  constructor(
    id: string,
    name: string,
    email: string,
    profile_image: { name: string } | null,
    password: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.profile_image = profile_image;
    this.password = password;
  }

  public static empty(): User {
    return new User('0', '', '', null, '');
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getProfileImage(): { name: string } | null {
    return this.profile_image;
  }

  public getId(): string {
    return this.id;
  }

  public getPassword(): string {
    return this.password;
  }
}
