import { COUNTRIES } from "@/constants/";

export function getCountryName(value: string): string {
   const country = COUNTRIES.find((c) => c.value === value);
   if (country) {
      const parts = country.label.split(" ");
      const flag = parts[0];
      const name = parts.slice(1).join(" ");
      return `${flag} ${name}`;
   }
   return "sin bandera";
}
