import { Role } from '@/views/employees/domain/Role';
import { EmployeeEvent } from '@/views/employees/domain/EmployeeEvent';

export class Employee {
  readonly id: string;
  private name: string;
  private email: string;
  private password: string;
  private role: Role;
  private active: boolean;
  private userId: string;
  private events: EmployeeEvent[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: Role,
    active: boolean,
    userId: string,
    events: EmployeeEvent[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.active = active;
    this.userId = userId;
    this.events = events;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    if (!Object.values(Role).includes(role)) {
      throw new Error('Invalid role for Employee');
    }
  }

  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getEmail(): string {
    return this.email;
  }
  getPassword(): string {
    return this.password;
  }
  getRole(): Role {
    return this.role;
  }
  isActive(): boolean {
    return this.active;
  }
  getUserId(): string {
    return this.userId;
  }
  getEvents(): EmployeeEvent[] {
    return [...this.events];
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  addEvent(event: EmployeeEvent): void {
    this.events.push(event);
  }
}
