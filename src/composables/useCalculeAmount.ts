import { watch } from "vue";
import { Line } from "@/models/";

type SetFieldValueFn<T> = <K extends keyof T>(field: K, value: T[K]) => void;

export function useCalculeAmount<T extends { lines: Line[]; totalAmount: number; totalTaxAmount: number }>(values: T, setFieldValue: SetFieldValueFn<T>) {
   watch(
      () => values.lines,
      (lines: Line[]) => {
         if (!Array.isArray(lines) || lines.length === 0) {
            setFieldValue("totalAmount", 0);
            setFieldValue("totalTaxAmount", 0);
            return;
         }

         const totalAmount = lines.reduce((acc, line) => {
            const lineTotal = typeof line.totalAmount === "number" ? line.totalAmount : 0;
            return acc + lineTotal;
         }, 0);

         setFieldValue("totalAmount", Number(totalAmount.toFixed(2)));

         const totalTaxAmount = lines.reduce((acc, line) => {
            const lineTax = typeof line.totalTaxAmount === "number" ? line.totalTaxAmount : 0;
            return acc + lineTax;
         }, 0);

         setFieldValue("totalTaxAmount", Number(totalTaxAmount.toFixed(2)));
      },
      { deep: true }
   );
}
