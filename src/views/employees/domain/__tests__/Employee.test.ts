import { describe, it, expect } from 'vitest';
import { Employee } from '../Employee';
import { Role } from '../Role';

describe('Employee', () => {
  it('should create an Employee instance with valid data', () => {
    const employee = new Employee(
      'emp1',
      'John Doe',
      'john@example.com',
      'password123',
      Role.ADMIN,
      true,
      'user1',
      [],
      new Date('2024-01-01T00:00:00Z'),
      new Date('2024-01-02T00:00:00Z')
    );
    expect(employee.getId()).toBe('emp1');
    expect(employee.getName()).toBe('John Doe');
    expect(employee.getEmail()).toBe('john@example.com');
    expect(employee.getPassword()).toBe('password123');
    expect(employee.getRole()).toBe(Role.ADMIN);
    expect(employee.isActive()).toBe(true);
    expect(employee.getUserId()).toBe('user1');
    expect(employee.getEvents().length).toBe(1);
    expect(employee.getCreatedAt()).toEqual(new Date('2024-01-01T00:00:00Z'));
    expect(employee.getUpdatedAt()).toEqual(new Date('2024-01-02T00:00:00Z'));
  });

  it('should throw an error for invalid role', () => {
    expect(() => {
      new Employee(
        'emp2',
        'Jane Doe',
        'jane@example.com',
        'password123',
        'invalid_role' as any,
        true,
        'user2',
        [],
        new Date(),
        new Date()
      );
    }).toThrow('Invalid role for Employee');
  });

  it('should add an event', () => {
    const employee = new Employee(
      'emp3',
      'Alice',
      'alice@example.com',
      'password123',
      Role.BASIC,
      false,
      'user3',
      [],
      new Date(),
      new Date()
    );

    expect(employee.getEvents().length).toBe(1);
    expect(employee.getEvents()[0].getId()).toBe('event2');
  });
});
