export interface Payment {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  time?: string;
}