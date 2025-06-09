import { Employee, Role } from '@/views/employees/domain/';
import { adaptTimeLineContent } from '@time-line-content/adapter';

export class EmployeeApiAdapter {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public role: Role;
  public active: boolean;
  public userId: string;
  public events: any[];
  public created_at: Date;
  public updated_at: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: Role,
    active: boolean,
    userId: string,
    events: any[],
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.active = active;
    this.userId = userId;
    this.events = events;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromApi(employeeApiAdapter: Partial<EmployeeApiAdapter>): Employee {
    return new Employee(
      employeeApiAdapter.id ?? '',
      employeeApiAdapter.name ?? '',
      employeeApiAdapter.email ?? '',
      employeeApiAdapter.password ?? '',
      employeeApiAdapter.role ?? Role.BASIC,
      employeeApiAdapter.active ?? true,
      employeeApiAdapter.userId ?? '',
      employeeApiAdapter.events?.map(adaptTimeLineContent) ?? [],
      new Date(employeeApiAdapter.created_at ?? new Date()),
      new Date(employeeApiAdapter.updated_at ?? new Date())
    );
  }

  static toApi(employee: Employee): EmployeeApiAdapter {
    return {
      id: employee.getId(),
      name: employee.getName(),
      email: employee.getEmail(),
      password: employee.getPassword(),
      role: employee.getRole(),
      active: employee.isActive(),
      userId: employee.getUserId(),
      events: employee.getEvents(),
      created_at: employee.getCreatedAt(),
      updated_at: employee.getUpdatedAt(),
    };
  }
}
