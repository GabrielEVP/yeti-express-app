export function formatPercentage(value: number, options?: Intl.NumberFormatOptions): string {
   const defaultOptions: Intl.NumberFormatOptions = {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
   };

   const mergedOptions = { ...defaultOptions, ...options };

   return new Intl.NumberFormat("es-ES", mergedOptions).format(value);
}
