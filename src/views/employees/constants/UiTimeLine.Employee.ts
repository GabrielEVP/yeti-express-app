import { User, SquareChartGantt, Truck, Package, LogIn, Banknote } from 'lucide-vue-next';
import { UITimeLineContentDefinitionMap } from '@/time-line-content/';

export const EMPLOYE_UI_TIME_LINE_CONTENT_DEFINITIONS: UITimeLineContentDefinitionMap = {
  create_client: {
    icon: User,
    title: 'Creación de cliente',
    text: 'Se ha registrado un nuevo cliente.',
  },
  update_client: {
    icon: User,
    title: 'Actualización de cliente',
    text: 'Se han actualizado los datos del cliente.',
  },
  delete_client: {
    icon: User,
    title: 'Eliminación de cliente',
    text: 'Se ha eliminado un cliente del sistema.',
  },
  create_company_bill: {
    icon: Banknote,
    title: 'Creación de gasto de empresa',
    text: 'Se ha creado una nueva factura para la empresa.',
  },
  update_company_bill: {
    icon: Banknote,
    title: 'Actualización de gasto de empresa',
    text: 'Se ha actualizado un gasto de empresa.',
  },
  delete_company_bill: {
    icon: Banknote,
    title: 'Eliminación de gasto de empresa',
    text: 'Se ha eliminado un gasto de empresa.',
  },
  create_service: {
    icon: SquareChartGantt,
    title: 'Creación de servicio',
    text: 'Se ha creado un nuevo servicio.',
  },
  update_service: {
    icon: SquareChartGantt,
    title: 'Actualización de servicio',
    text: 'Se ha creado un nuevo servicio.',
  },
  delete_service: {
    icon: SquareChartGantt,
    title: 'Eliminación de servicio',
    text: 'Se ha creado un nuevo servicio.',
  },
  create_courier: {
    icon: Truck,
    title: 'Creación de repartidor',
    text: 'Se ha registrado un nuevo repartidor.',
  },
  update_courier: {
    icon: Truck,
    title: 'Actualización de repartidor',
    text: 'Se han actualizado los datos del repartidor.',
  },
  delete_courier: {
    icon: Truck,
    title: 'Eliminación de repartidor',
    text: 'Se ha eliminado un repartidor del sistema.',
  },
  create_delivery: {
    icon: Package,
    title: 'Creación de entrega',
    text: 'Se ha creado una nueva entrega.',
  },
  update_delivery: {
    icon: Package,
    title: 'Actualización de entrega',
    text: 'Se han actualizado los datos de una entrega.',
  },
  delete_delivery: {
    icon: Package,
    title: 'Eliminación de entrega',
    text: 'Se ha eliminado una entrega del sistema.',
  },
  update_status_delivered_delivery: {
    icon: Package,
    title: 'Entrega finalizada',
    text: 'El estado de una entrega ha cambiado a "entregado".',
  },
  update_status_transit_delivery: {
    icon: Package,
    title: 'Entrega en tránsito',
    text: 'El estado de una entrega ha cambiado a "en tránsito".',
  },
  update_status_cancelled_delivery: {
    icon: Package,
    title: 'Entrega Cancelada',
    text: 'El estado de una entrega ha cambiado a "Cancelado".',
  },
  login_employee: {
    icon: LogIn,
    title: 'Inicio de sesión de empleado',
    text: 'Un empleado ha iniciado sesión en el sistema.',
  },
};
