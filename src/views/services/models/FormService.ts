export interface FormService {
  id: string;
  name: string;
  description: string;
  amount: number;
  bills: FormBill[];
}

export interface FormBill {
  id: string;
  name: string;
  amount: number;
}
