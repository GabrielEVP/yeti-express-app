import { SelectOption } from "@/models/";

export const CURRENCYSELECT: SelectOption[] = [
   { value: "USD", label: "Dolares" },
   { value: "BOV", label: "Bolivares" },
   { value: "OTH", label: "Otro" },
] as const;

export const CURRENCY_MAP = {
   USD: "Dólares ",
   BOV: "Bolivares ",
   OTH: "Otro",
};
