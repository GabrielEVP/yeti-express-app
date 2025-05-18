import { SelectOption } from "@models";

export const BANKACCOUNTSELECT: SelectOption[] = [
    { value: 'OT', label: 'Otro' },
    { value: 'AH', label: 'Ahorro' },
    { value: 'CO', label: 'Corriente' },
] as const