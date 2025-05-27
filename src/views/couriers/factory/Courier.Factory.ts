import { Courier } from '@/views/couriers/domain/Courier';

export const createDefaultCourier = (): Courier => {
  return new Courier('', '', '', '', true, new Date(), new Date());
};
