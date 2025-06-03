import { Service } from '@views/services/domain/service/Service';

export const createDefaultService = (): Service => {
  return new Service('', '', '', 0, 0, true, new Date(), new Date());
};
