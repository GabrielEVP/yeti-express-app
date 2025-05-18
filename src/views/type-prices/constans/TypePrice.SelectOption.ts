import { SelectOption } from "@/models/";

export const TYPEPRICESELECT: SelectOption[] = [
  { value: "fixed", label: "Completo" },
  { value: "percentage", label: "Porcentaje" },
] as const;
