import { SelectOption } from "@models";

export const CURRENCYSELECT: SelectOption[] = [
   { value: "USD", label: "Dolares" },
   { value: "BOV", label: "Bolivares" },
   { value: "OT", label: "Otro" },
] as const;
