import { Courier } from '@/views/couriers/domain/Courier';

export class CourierFormAdapter {
  static fromForm(form: any): Courier {
    return new Courier(
      form.id ?? '',
      form.firstName,
      form.lastName,
      form.phone,
      form.active,
      [],
      [],
      new Date(form.createdAt),
      new Date(form.updatedAt)
    );
  }

  static toForm(courier: Courier): any {
    return {
      id: courier.getId(),
      firstName: courier.getFirstName(),
      lastName: courier.getLastName(),
      phone: courier.getPhone(),
      active: courier.isActive(),
      createdAt: courier.getCreatedAt(),
      updatedAt: courier.getUpdatedAt(),
    };
  }
}
