import { HomeIcon, FileTextIcon, Bike, UsersIcon, CircleUser, FileChartColumn } from "lucide-vue-next";

export interface MenuItem {
   id: string;
   title: string;
   icon?: any;
   url?: string;
   isActive?: boolean;
   children?: MenuItem[];
}
export const menuItems: MenuItem[] = [
   {
      id: "home",
      title: "Inicio",
      icon: HomeIcon,
      url: "/home",
      isActive: true,
   },
   {
      id: "contactos",
      title: "Contactos",
      icon: CircleUser,
      children: [
         {
            id: "clients",
            title: "Clientes",
            icon: UsersIcon,
            url: "/clients",
         },
      ],
   },
   {
      id: "facturacion",
      title: "Deliveries",
      icon: FileChartColumn,
      children: [
         {
            id: "deliveries",
            title: "Deliverys",
            icon: FileTextIcon,
            url: "/deliveries",
         },
      ],
   },
   {
      id: "facturacion",
      title: "Repartidores",
      icon: Bike,
      children: [
         {
            id: "Repartidores",
            title: "Repartidores",
            icon: Bike,
            url: "/couriers",
         },
      ],
   },
];
