import { Pagination, PaginationParams } from "../model/pagination";
import { ShoppingList } from "../model/shoppingList";

interface Results {
  results: ShoppingList[];
  pagination: Pagination;
}

const initialShoppingListData: ShoppingList[] = [
  {
    id: 1,
    date: new Date("2024-04-03T16:19:09.840Z"),
    total: 195,
    products: [
      {
        id: 1,
        quantity: 5,
        productId: 1,
        priceUnit: 32,
        addInCart: true,
        product: {
          id: 1,
          name: "Maça",
          image: "pexels-mali-maeder-102104.jpg",
          categoryId: 1,
          category: { id: 1, name: "Frutas" },
        },
      },
      {
        id: 2,
        quantity: 2,
        productId: 2,
        priceUnit: 15,
        addInCart: true,
        product: {
          id: 2,
          name: "Carne",
          image: "pexels-lukas-618773.jpg",
          categoryId: 2,
          category: { id: 2, name: "Carnes" },
        },
      },
      {
        id: 3,
        quantity: 3,
        productId: 3,
        priceUnit: 0,
        addInCart: true,
        product: {
          id: 3,
          name: "Frango",
          image: "pexels-lukas-616354.jpg",
          categoryId: 2,
          category: { id: 2, name: "Carnes" },
        },
      },
      {
        id: 4,
        quantity: 2,
        productId: 4,
        priceUnit: 0,
        addInCart: true,
        product: {
          id: 4,
          name: "Biscoito caseiro",
          image: "pexels-pixabay-266706.jpg",
          categoryId: 3,
          category: { id: 3, name: "Biscoitos" },
        },
      },
      {
        id: 5,
        quantity: 1,
        productId: 5,
        priceUnit: 5,
        addInCart: true,
        product: {
          id: 5,
          name: "Sabonete",
          image: "pexels-cup-of-couple-6962871.jpg",
          categoryId: 4,
          category: { id: 4, name: "Higiene" },
        },
      },
      {
        id: 6,
        quantity: 3,
        productId: 6,
        priceUnit: 0,
        addInCart: true,
        product: {
          id: 6,
          name: "Arroz",
          image: "pexels-polina-tankilevitch-4110251.jpg",
          categoryId: 5,
          category: { id: 5, name: "Ceriais" },
        },
      },
    ],
    marketId: 1,
    market: {
      id: 1,
      name: "Mercado das frutas",
      zip: "01153-000",
      street: "Rua Vitorino Carmilo",
      number: "4596",
      neighborhood: "Barra Funda",
      state: "SP",
      city: "São Paulo",
    },
  },
  {
    id: 2,
    date: new Date("2024-03-07T00:00:00.000Z"),
    total: 529,
    products: [
      {
        quantity: 23,
        productId: 2,
        priceUnit: 23,
        addInCart: true,
        product: {
          id: 2,
          name: "Carne",
          image: "pexels-lukas-618773.jpg",
          categoryId: 2,
          category: { id: 2, name: "Carnes" },
        },
        id: 1,
      },
    ],
    marketId: 1,
    market: {
      id: 1,
      name: "Mercado das frutas",
      zip: "01153-000",
      street: "Rua Vitorino Carmilo",
      number: "4596",
      neighborhood: "Barra Funda",
      state: "SP",
      city: "São Paulo",
    },
  },
];

const initializeShoppingListData = (): void => {
  const existingData = localStorage.getItem("shoppingListData");
  if (!existingData) {
    localStorage.setItem(
      "shoppingListData",
      JSON.stringify(initialShoppingListData)
    );
  }
};

initializeShoppingListData();

const getShoppingListDataFromLocalStorage = (): ShoppingList[] => {
  const shoppingListDataStr = localStorage.getItem("shoppingListData");
  return shoppingListDataStr ? JSON.parse(shoppingListDataStr) : [];
};

const saveShoppingListDataToLocalStorage = (data: ShoppingList[]): void => {
  localStorage.setItem("shoppingListData", JSON.stringify(data));
};

export const shoppingListService = {
  paginationShoppingList: async (
    params?: PaginationParams
  ): Promise<Results> => {
    try {
      const shoppingListData = getShoppingListDataFromLocalStorage();

      const page = params?.page || 1;
      const pageSize = params?.size || 10;

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const paginatedItems = shoppingListData.slice(startIndex, endIndex);
      const paginationMock: Pagination = {
        page,
        length: shoppingListData.length,
        size: pageSize,
        lastPage: Math.ceil(shoppingListData.length / pageSize),
      };

      return {
        results: paginatedItems,
        pagination: paginationMock,
      };
    } catch (error) {
      console.error("Erro shoppingList pagination", error);
      throw error;
    }
  },

  getShoppingListById: async (
    id: number
  ): Promise<ShoppingList | undefined> => {
    try {
      const shoppingListData = getShoppingListDataFromLocalStorage();
      const shoppingList = shoppingListData.find((sl) => sl.id === id);

      return shoppingList;
    } catch (error) {
      console.error("Error shoppingList by ID:", error);
      throw error;
    }
  },

  createShoppingList: async (
    shoppingListData: ShoppingList
  ): Promise<ShoppingList> => {
    try {
      const oldShoppingListData = getShoppingListDataFromLocalStorage();

      const newShoppingList: ShoppingList = {
        ...shoppingListData,
        id: oldShoppingListData.length + 1,
      };

      let total = 0;

      for (let index = 0; index < newShoppingList.products.length; index++) {
        const product = newShoppingList.products[index];
        product.id = index + 1;
        total += product.priceUnit * product.quantity;
      }

      newShoppingList.total = total;

      oldShoppingListData.push(newShoppingList);

      saveShoppingListDataToLocalStorage(oldShoppingListData);
      return newShoppingList;
    } catch (error) {
      console.error("Error creating shoppingList:", error);
      throw error;
    }
  },

  updateShoppingList: async (
    id: number,
    shoppingListData: ShoppingList
  ): Promise<ShoppingList | undefined> => {
    try {
      const oldShoppingListData = getShoppingListDataFromLocalStorage();

      const index = oldShoppingListData.findIndex((sl) => sl.id === id);
      if (index !== -1) {
        oldShoppingListData[index] = { id, ...shoppingListData };

        let total = 0;

        for (
          let indexNow = 0;
          indexNow < oldShoppingListData[index].products.length;
          indexNow++
        ) {
          const product = oldShoppingListData[index].products[indexNow];
          product.id = indexNow + 1;
          total += product.priceUnit * product.quantity;
        }

        oldShoppingListData[index].total = total;

        saveShoppingListDataToLocalStorage(oldShoppingListData);
        return oldShoppingListData[index];
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error updating shoppingList:", error);
      throw error;
    }
  },

  removeShoppingList: async (id: number): Promise<void> => {
    try {
      const oldShoppingListData = getShoppingListDataFromLocalStorage();
      const index = oldShoppingListData.findIndex((sl) => sl.id === id);
      if (index !== -1) {
        oldShoppingListData.splice(index, 1);
        saveShoppingListDataToLocalStorage(oldShoppingListData);
      }
    } catch (error) {
      console.error("Error removing shoppingList:", error);
      throw error;
    }
  },
};
