import { Receipt } from 'lucide-vue-next';
import { UITimeLineContentDefinitionMap } from '@/time-line-content/domain';

export const COURIER_UI_TIME_LINE_CONTENT_DEFINITIONS: UITimeLineContentDefinitionMap = {
  update_courier: {
    icon: Receipt,
    title: 'Actualización del repartidor',
    text: 'Se ha actualizado el repartidor',
  },
  create_courier: {
    icon: Receipt,
    title: 'Creación del repartidor',
    text: 'Se ha creado un nuevo repartidor',
  },
  delete_courier: {
    icon: Receipt,
    title: 'Repartidor Borrado',
    text: 'Se ha eliminado el repartidor',
  },
};
