import { Employee } from '@/views/employees/domain/Employee';
import { Role } from '@/views/employees/domain/Role';

export const createDefaultEmployee = (): Employee => {
  return new Employee('', '', '', '', Role.BASIC, true, '', [], new Date(), new Date());
};
