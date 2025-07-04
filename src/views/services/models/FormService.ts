export interface FormService {
  id: string;
  name: string;
  description: string;
  amount: number;
  bills: Bill[];
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
}
