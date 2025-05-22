import { SelectOption } from "@/models/";

export const PAYMENT_SELECT: SelectOption[] = [
   { value: "full", label: "Contado" },
   { value: "partial", label: "A plazo" },
] as const;

export const PAYMENT_TYPE_MAP = {
   full: "Contado",
   partial: "A plazo",
};
