import { HomeIcon, FileTextIcon, ClipboardIcon, WalletIcon, UsersIcon, BookUser, PackageSearch, Receipt, HandCoins, CircleUser, FileChartColumn, Warehouse, ChartBarStacked } from "lucide-vue-next";

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
      title: "Facturacion",
      icon: FileChartColumn,
      children: [
         {
            id: "invoices",
            title: "Deliverys",
            icon: FileTextIcon,
            url: "/invoices",
         },
      ],
   },
];
