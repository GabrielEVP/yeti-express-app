import { CreditCard, Building2, Contact, FileText, MapPin, User } from "lucide-vue-next";

export const CLIENTTABS = [
   { value: "general", label: "General", icon: User },
   { value: "address", label: "Direcciones", icon: MapPin },
   { value: "contact", label: "Contactos", icon: Contact },
   { value: "bank", label: "Banco", icon: CreditCard },
   { value: "billing", label: "Facturación", icon: FileText },
   { value: "notes", label: "Notas", icon: Building2 },
];
