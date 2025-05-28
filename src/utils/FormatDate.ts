import dayjs from "dayjs";
import "dayjs/locale/es";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("es");
dayjs.extend(relativeTime);

// 1. Long date: May 14, 2025 at 08:32
export function formatDate(value?: string | Date): string {
   if (!value) return "Fecha no disponible";

   try {
      const cleaned = typeof value === "string" ? value.replace(/\.\d{3,}Z$/, "Z") : value;

      const date = dayjs(cleaned);
      if (!date.isValid()) throw new Error("Invalid date");

      return date.format("D [de] MMMM [de] YYYY [a las] HH:mm");
   } catch (error) {
      console.warn("Error formatting date:", value, error);
      return "Fecha inválida";
   }
}

// 2. Short date: 14/05/2025
export function formatDateShort(value?: string | Date): string {
   if (!value) return "Fecha no disponible";

   try {
      const cleaned = typeof value === "string" ? value.replace(/\.\d{3,}Z$/, "Z") : value;

      const date = dayjs(cleaned);
      if (!date.isValid()) throw new Error("Invalid date");

      return date.format("DD/MM/YYYY");
   } catch (error) {
      console.warn("Error formatting short date:", value, error);
      return "Fecha inválida";
   }
}

// 3. 2 weeks ago / 4 months ago
export function formatRelativeDate(value?: string | Date): string {
   if (!value) return "Fecha no disponible";

   try {
      const cleaned = typeof value === "string" ? value.replace(/\.\d{3,}Z$/, "Z") : value;

      const date = dayjs(cleaned);
      if (!date.isValid()) throw new Error("Invalid date");

      return date.fromNow();
   } catch (error) {
      console.warn("Error getting relative date:", value, error);
      return "Fecha inválida";
   }
}

// 4. Age since a date: "4 months old"
export function formatClientAge(value?: string | Date): string {
   if (!value) return "Fecha no disponible";

   try {
      const cleaned = typeof value === "string" ? value.replace(/\.\d{3,}Z$/, "Z") : value;

      const date = dayjs(cleaned);
      if (!date.isValid()) throw new Error("Invalid date");

      return `${date.fromNow(true)} de antigüedad`;
   } catch (error) {
      console.warn("Error calculating age:", value, error);
      return "Fecha inválida";
   }
}

// 5. Custom date: Sep 2, 2025
export function formatDateCustom(value?: string | Date): string {
   if (!value) return "Fecha no disponible";

   try {
      const cleaned = typeof value === "string" ? value.replace(/\.\d{3,}Z$/, "Z") : value;

      const date = dayjs(cleaned);
      if (!date.isValid()) throw new Error("Invalid date");

      return date.format("D MMM YYYY");
   } catch (error) {
      console.warn("Error formatting custom date:", value, error);
      return "Fecha inválida";
   }
}
