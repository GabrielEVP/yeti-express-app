export interface Service {
  id: string;
  name: string;
  description: string;
  amount: number;
  comision: number;
  bills: Bill[];
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
}
