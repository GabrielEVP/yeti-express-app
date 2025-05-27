import { Courier } from '@/views/couriers/domain/Courier';

export function mapFormToCourier(form: any): Courier {
  return new Courier(
    form.id ?? '',
    form.firstName,
    form.lastName,
    form.phone,
    form.active,
    new Date(),
    new Date()
  );
}
