import { User, Receipt } from 'lucide-vue-next';
import { UITimeLineContentDefinitionMap } from '@/time-line-content/domain';

export const CLIENT_UI_TIME_LINE_CONTENT_DEFINITIONS: UITimeLineContentDefinitionMap = {
  update_client: {
    icon: User,
    title: 'Actualización de cliente',
    text: 'Se han actualizado los datos del cliente',
  },

  update_delivery: {
    icon: Receipt,
    title: 'Actualización del delivery',
    text: 'Se ha actualizado el delivery',
  },

  create_delivery: {
    icon: Receipt,
    title: 'Creación del delivery',
    text: 'Se ha creado un nuevo delivery',
  },

  delete_delivery: {
    icon: Receipt,
    title: 'Delivery Borrado',
    text: 'Se ha eliminado el delivery',
  },
};
