import { User } from 'lucide-vue-next';
import { TimeLineContent } from '@/models/LineContent';

export const EMPLOYEE_EVENT_DEFINITION: Record<string, Omit<TimeLineContent, 'date'>> = {
  update_employee: {
    icon: User,
    title: 'Actualización del empleado',
    text: 'Se han actualizado los datos del empleado',
  },
};
