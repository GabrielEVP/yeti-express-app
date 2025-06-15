import { Bill, Service } from '../models/Service';

export const SERVICES_FORM_VALUE: Service = {
  id: '',
  name: '',
  description: '',
  amount: 0,
  comision: 0,
  events: [],
  bills: [],
  createdAt: '',
  updatedAt: '',
};

export const BILL_FORM_VALUE: Bill = {
  id: '',
  name: '',
  amount: 0,
};
