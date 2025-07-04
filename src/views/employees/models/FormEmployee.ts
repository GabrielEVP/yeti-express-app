import { Role } from '@views/employees';

export interface FormEmployee {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface Password {
  password: string;
  confirmPassword: string;
}
