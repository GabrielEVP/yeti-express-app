import { Role } from '@views/employees';

export interface DetailEmployee {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  created_at: string;
  updated_at: string;
}
