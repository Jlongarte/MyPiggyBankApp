// src/services/cryptoService.ts

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

export const apiService = {
  getBalance: async (userId: string): Promise<UserBalance> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        availableBalance: 12450.85,
        totalIncome: 15300.00,
        totalExpenses: 2849.15
      };
    } catch (error) {
      console.error("Error al obtener balance:", error);
      throw error;
    }
  },

  getTransactions: async (userId: string): Promise<Transaction[]> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return [
        { id: "1", concept: "Nómina Mensual", amount: 2500, type: "income", date: "2026-07-01", category: "Salario" },
        { id: "2", concept: "Supermercado Central", amount: -84.50, type: "expense", date: "2026-07-02", category: "Alimentación" },
        { id: "3", concept: "Suscripción Premium AIR", amount: -14.99, type: "expense", date: "2026-07-03", category: "Entretenimiento" },
        { id: "4", concept: "Transferencia Recibida", amount: 120, type: "income", date: "2026-07-04", category: "Otros" }
      ];
    } catch (error) {
      console.error("Error al obtener transacciones:", error);
      throw error;
    }
  },

  getCryptoMarket: async (): Promise<CryptoCoin[]> => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=6&page=1&sparkline=false"
      );

      if (!response.ok) {
        throw new Error(`Error en la petición HTTP: ${response.status}`);
      }

      const data = await response.json();

      return data.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        current_price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        image: coin.image
      }));
    } catch (error) {
      console.error("Fallo crítico al conectar con la API de CoinGecko:", error);
      throw error;
    }
  }
};