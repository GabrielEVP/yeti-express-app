import { FileText, ReceiptText } from 'lucide-vue-next';

export const TABS_FORM_SERVICE = [
  {
    label: 'General',
    value: 'general',
    icon: FileText,
  },
  {
    label: 'Gastos',
    value: 'bills',
    icon: ReceiptText,
  },
] as const;
