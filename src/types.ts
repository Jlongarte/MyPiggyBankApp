export interface Transaction {
  id: string;
  concept: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  category: string;
}

export interface CryptoCoin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export interface UserBalance {
  availableBalance: number;
  totalIncome: number;
  totalExpenses: number;
}