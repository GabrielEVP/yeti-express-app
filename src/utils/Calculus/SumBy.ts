export function sumBy<T>(items: T[], getValue: (item: T) => number): number {
   return items.reduce((acc, item) => acc + getValue(item), 0);
}
