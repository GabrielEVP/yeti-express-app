import { SelectOption } from "@models";

export const STATUSBILLINGSELECT: SelectOption[] = [
   { value: "pending", label: "Pendiente" },
   { value: "paid", label: "Pagado" },
   { value: "refused", label: "Rechazado" },
] as const;

export const STATUS_BILLING_MAP = {
   pending: "Pendiente",
   paid: "Pagado",
   refused: "Rechazado",
};
