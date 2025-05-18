export interface TypePrice {
  id: string;
  name: string;
  type: "fixed" | "percentage";
  margin: number;
  userId: string;
}
