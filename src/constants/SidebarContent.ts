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
         {
            id: "suppliers",
            title: "Proveedores",
            icon: BookUser,
            url: "/suppliers",
         },
      ],
   },
   {
      id: "facturacion",
      title: "Facturación",
      icon: FileChartColumn,
      children: [
         {
            id: "invoices",
            title: "Facturas",
            icon: FileTextIcon,
            url: "/invoices",
         },
         {
            id: "orders",
            title: "Presupuestos",
            icon: ClipboardIcon,
            url: "/orders",
         },
         {
            id: "purchases",
            title: "Compras",
            icon: WalletIcon,
            url: "/purchases",
         },
         {
            id: "type-payments",
            title: "Tipos de pagos",
            icon: HandCoins,
            url: "/type-payments",
         },
      ],
   },
   {
      id: "almacen",
      title: "Almacén",
      icon: Warehouse,
      children: [
         {
            id: "products",
            title: "Productos",
            icon: PackageSearch,
            url: "/products",
         },
         {
            id: "categories",
            title: "Categorías",
            icon: ChartBarStacked,
            url: "/categories",
         },
         {
            id: "type-prices",
            title: "Tipos de precios",
            icon: Receipt,
            url: "/type-prices",
         },
      ],
   },
];
