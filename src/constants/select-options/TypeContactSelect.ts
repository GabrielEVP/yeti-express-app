import { SelectOption } from "@models";

export const TYPECONTACTSELECT: SelectOption[] = [
    { value: 'NT', label: 'Natural' },
    { value: 'JU', label: 'Jurídico' },
    { value: 'GB', label: 'Gobierno' },
    { value: 'OT', label: 'Otros' }
] as const