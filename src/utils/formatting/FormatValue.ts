export function formatValue<T>(value: T, dictionary: Record<T extends string | number | symbol ? T : string, string>, defaultValue?: string): string {
   if (dictionary.hasOwnProperty(value as any)) {
      return dictionary[value as T extends string | number | symbol ? T : string];
   }

   return defaultValue !== undefined ? defaultValue : String(value);
}
