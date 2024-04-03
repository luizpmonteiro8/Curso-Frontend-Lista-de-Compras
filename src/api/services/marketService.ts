import { Market } from "../model/market";
import { Pagination, PaginationParams } from "../model/pagination";

interface Results {
  results: Market[];
  pagination: Pagination;
}

const initialMarketData: Market[] = [
  {
    id: 1,
    name: "Mercado das frutas",
    zip: "01153-000",
    street: "Rua Vitorino Carmilo",
    number: "4596",
    neighborhood: "Barra Funda",
    state: "SP",
    city: "São Paulo",
  },
];

const initializeMarketData = (): void => {
  const existingData = localStorage.getItem("marketData");
  if (!existingData) {
    localStorage.setItem("marketData", JSON.stringify(initialMarketData));
  }
};

initializeMarketData();

const getMarketDataFromLocalStorage = (): Market[] => {
  const marketDataStr = localStorage.getItem("marketData");
  return marketDataStr ? JSON.parse(marketDataStr) : [];
};

const saveMarketDataToLocalStorage = (data: Market[]): void => {
  localStorage.setItem("marketData", JSON.stringify(data));
};

export const marketService = {
  paginationMarket: async (params?: PaginationParams): Promise<Results> => {
    try {
      const marketData = getMarketDataFromLocalStorage();

      const page = params?.page || 1;
      const pageSize = params?.size || 10;

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const paginatedItems = marketData.slice(startIndex, endIndex);
      const paginationMock: Pagination = {
        page,
        length: marketData.length,
        size: pageSize,
        lastPage: Math.ceil(marketData.length / pageSize),
      };

      return {
        results: paginatedItems,
        pagination: paginationMock,
      };
    } catch (error) {
      console.error("Erro market pagination", error);
      throw error;
    }
  },

  getMarketById: async (id: number): Promise<Market | undefined> => {
    try {
      const marketData = getMarketDataFromLocalStorage();
      const market = marketData.find((m) => m.id === id);
      return market;
    } catch (error) {
      console.error("Error market by ID:", error);
      throw error;
    }
  },

  createMarket: async (marketData: Market): Promise<Market> => {
    try {
      const oldMarketData = getMarketDataFromLocalStorage();

      const newMarket: Market = {
        ...marketData,
        id: oldMarketData.length + 1,
      };

      oldMarketData.push(newMarket);
      saveMarketDataToLocalStorage(oldMarketData);
      return newMarket;
    } catch (error) {
      console.error("Error creating market:", error);
      throw error;
    }
  },

  updateMarket: async (
    id: number,
    marketData: Market
  ): Promise<Market | undefined> => {
    try {
      const oldMarketData = getMarketDataFromLocalStorage();

      const index = oldMarketData.findIndex((m) => m.id === id);
      if (index !== -1) {
        oldMarketData[index] = { id, ...marketData };
        saveMarketDataToLocalStorage(oldMarketData);
        return oldMarketData[index];
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error updating market:", error);
      throw error;
    }
  },

  removeMarket: async (id: number): Promise<void> => {
    try {
      const oldMarketData = getMarketDataFromLocalStorage();
      const index = oldMarketData.findIndex((m) => m.id === id);
      if (index !== -1) {
        oldMarketData.splice(index, 1);
        saveMarketDataToLocalStorage(oldMarketData);
      }
    } catch (error) {
      console.error("Error removing market:", error);
      throw error;
    }
  },
};
