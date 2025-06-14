import { Receipt } from 'lucide-vue-next';
import { UITimeLineContentDefinitionMap } from '@/time-line-content/';

export const DELIVERY_UI_TIME_LINE_CONTENT_DEFINITIONS: UITimeLineContentDefinitionMap = {
  create_delivery: {
    icon: Receipt,
    title: 'Creación del delivery',
    text: 'Se ha creado un nuevo delivery',
  },
  update_delivery: {
    icon: Receipt,
    title: 'Actualización del delivery',
    text: 'Se ha actualizado la información del delivery',
  },
  status_update: {
    icon: Receipt,
    title: 'Actualizacion de estado',
    text: 'Se ha actualizado el estado del delivery',
  },
  update_status_canceled_delivery: {
    icon: Receipt,
    title: 'Delivery cancelado',
    text: 'Se ha cancelado el delivery',
  },
  update_status_transit_delivery: {
    icon: Receipt,
    title: 'Delivery puesto en tránsito',
    text: 'Se ha puesto en tránsito el delivery',
  },
  update_status_delivered_delivery: {
    icon: Receipt,
    title: 'Delivery puesto en entregado',
    text: 'Se ha puesto en entregado el delivery',
  },
};
