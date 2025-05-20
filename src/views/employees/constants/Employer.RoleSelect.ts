import { SelectOption } from "@/models/";

export const ROLE_SELECT: SelectOption[] = [
   { value: "admin", label: "administrador" },
   { value: "basic", label: "basico" },
] as const;
