export function formatCurrency(amount: number, locale = "es-ES", currency = "EUR"): string {
   return amount.toLocaleString(locale, {
      style: "currency",
      currency,
   });
}

export function pluralize(count: number, singular: string, plural: string): string {
   return count === 1 ? singular : plural;
}

export function formatCountWithPlural(count: number, singular: string, plural: string): string {
   const word = pluralize(1, singular, plural);
   return `${count} ${word}`;
}

export function formatPercentageChange(value: number | null, noDataText = "Sin datos del mes anterior"): string {
   if (value === null) return noDataText;
   const sign = value > 0 ? "+" : "";
   return `${sign}${value.toFixed(1)}% respecto al mes anterior`;
}
