import { FileText, ReceiptText } from 'lucide-vue-next';

export const SERVICE_TABS = [
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
