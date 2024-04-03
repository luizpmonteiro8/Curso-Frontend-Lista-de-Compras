import { ShoppingList } from "../model/shoppingList";

interface MonthlyReport {
  [key: string]: number;
}

interface ReportResult {
  monthlyTotal: MonthlyReport;
  totalItems: number;
}

const getShoppingListDataFromLocalStorage = (): ShoppingList[] => {
  const shoppingListDataStr = localStorage.getItem("shoppingListData");
  return shoppingListDataStr ? JSON.parse(shoppingListDataStr) : [];
};

const reportService = {
  productReport: async (
    productId: number,
    dateStart = "2000-01-01",
    dateEnd = "3000-01-01"
  ): Promise<ReportResult> => {
    try {
      const shoppingList: ShoppingList[] =
        getShoppingListDataFromLocalStorage();
      const productShoppingList: (ShoppingList | undefined)[] =
        shoppingList.map((sl) => {
          const list = sl.products;
          if (list && list.length > 0) {
            const products = list.filter(
              (product) =>
                product.productId === productId &&
                new Date(sl.date!) >= new Date(dateStart) &&
                new Date(sl.date!) <= new Date(dateEnd)
            );
            if (products.length > 0) return sl;
          }
        });

      const monthlyTotal: { [key: string]: number } = {};

      productShoppingList.forEach((list) => {
        if (!list) return;
        const yearMonth = new Date(list.date!).toISOString().slice(0, 7);

        if (!monthlyTotal[yearMonth]) {
          monthlyTotal[yearMonth] = 0;
        }

        if (list.products && list.products.length > 0) {
          const listTotal = list.products
            .map((product) =>
              product.addInCart ? product.quantity * product.priceUnit : 0
            )
            .reduce((a, b) => a + b, 0);

          monthlyTotal[yearMonth] += listTotal;
        }
      });

      return {
        monthlyTotal,
        totalItems: productShoppingList.length,
      };
    } catch (error) {
      console.error("Error report product:", error);
      throw error;
    }
  },
  marketReport: async (
    marketId: number,
    dateStart = "2000-01-01",
    dateEnd = "3000-01-01"
  ): Promise<ReportResult> => {
    try {
      const shoppingList: ShoppingList[] =
        getShoppingListDataFromLocalStorage();
      const productShoppingList: (ShoppingList | undefined)[] =
        shoppingList.map((sl) => {
          if (
            sl.marketId === marketId &&
            new Date(sl.date!) >= new Date(dateStart) &&
            new Date(sl.date!) <= new Date(dateEnd)
          )
            return sl;
        });

      const monthlyTotal: { [key: string]: number } = {};

      productShoppingList.forEach((list) => {
        if (!list) return;
        const yearMonth = new Date(list.date!).toISOString().slice(0, 7);

        if (!monthlyTotal[yearMonth]) {
          monthlyTotal[yearMonth] = 0;
        }

        if (list.products && list.products.length > 0) {
          const listTotal = list.products
            .map((product) =>
              product.addInCart ? product.quantity * product.priceUnit : 0
            )
            .reduce((a, b) => a + b, 0);

          monthlyTotal[yearMonth] += listTotal;
        }
      });

      return {
        monthlyTotal,
        totalItems: productShoppingList.length,
      };
    } catch (error) {
      console.error("Error report market:", error);
      throw error;
    }
  },
};

export default reportService;
