import { Role } from '@views/employees';

export interface ListEmployee {
  id: string;
  name: string;
  email: string;
  role: Role;
}
