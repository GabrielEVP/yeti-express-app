import { SelectOption } from '@models';
import { Bill, Service } from '../models/Service';

export const SERVICES_FORM_VALUE: Service = {
  name: '',
  description: '',
  amount: 0,
  comision: 0,
  bills: [],
};

export const BILL_FORM_VALUE: Bill = {
  name: '',
  amount: 0,
};
