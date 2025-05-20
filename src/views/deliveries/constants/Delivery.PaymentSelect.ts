import { SelectOption } from "@/models/";

export const PAYMENT_SELECT: SelectOption[] = [
   { value: "Full", label: "Contado" },
   { value: "Partial", label: "A plazo" },
] as const;
