import { Category } from "../model/category";
import { Pagination, PaginationParams } from "../model/pagination";

interface Results {
  results: Category[];
  pagination: Pagination;
}

const initialCategoryData: Category[] = [
  { id: 1, name: "Frutas" },
  { id: 2, name: "Carnes" },
  { id: 3, name: "Biscoitos" },
  { id: 4, name: "Higiene" },
  { id: 5, name: "Cereais" },
];

const initializeCategoryData = (): void => {
  const existingData = localStorage.getItem("categoryData");
  if (!existingData) {
    localStorage.setItem("categoryData", JSON.stringify(initialCategoryData));
  }
};

initializeCategoryData();

const getCategoryDataFromLocalStorage = (): Category[] => {
  const categoryDataStr = localStorage.getItem("categoryData");
  return categoryDataStr ? JSON.parse(categoryDataStr) : [];
};

const saveCategoryDataToLocalStorage = (data: Category[]): void => {
  localStorage.setItem("categoryData", JSON.stringify(data));
};

export const categoryService = {
  paginationCategory: async (params?: PaginationParams): Promise<Results> => {
    try {
      const categoryData = getCategoryDataFromLocalStorage();

      const page = params?.page || 1;
      const pageSize = params?.size || 10;

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const paginatedItems = categoryData.slice(startIndex, endIndex);
      const paginationMock: Pagination = {
        page,
        length: categoryData.length,
        size: pageSize,
        lastPage: Math.ceil(categoryData.length / pageSize),
      };

      return {
        results: paginatedItems,
        pagination: paginationMock,
      };
    } catch (error) {
      console.error("Erro category pagination", error);
      throw error;
    }
  },

  getCategoryById: async (id: number): Promise<Category | undefined> => {
    try {
      const categoryData = getCategoryDataFromLocalStorage();
      const category = categoryData.find((cat) => cat.id === id);
      return category;
    } catch (error) {
      console.error("Error category by ID:", error);
      throw error;
    }
  },

  createCategory: async (categoryData: Category): Promise<Category> => {
    try {
      const oldCategoryData = getCategoryDataFromLocalStorage();

      const newCategory: Category = {
        ...categoryData,
        id: oldCategoryData.length + 1,
      };

      oldCategoryData.push(newCategory);
      saveCategoryDataToLocalStorage(oldCategoryData);
      return newCategory;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  updateCategory: async (
    id: number,
    categoryData: Category
  ): Promise<Category | undefined> => {
    try {
      const oldCategoryData = getCategoryDataFromLocalStorage();

      const index = oldCategoryData.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        oldCategoryData[index] = { id, ...categoryData };
        saveCategoryDataToLocalStorage(oldCategoryData);
        return oldCategoryData[index];
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  removeCategory: async (id: number): Promise<void> => {
    try {
      const oldCategoryData = getCategoryDataFromLocalStorage();
      const index = oldCategoryData.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        oldCategoryData.splice(index, 1);
        saveCategoryDataToLocalStorage(oldCategoryData);
      }
    } catch (error) {
      console.error("Error removing category:", error);
      throw error;
    }
  },
};
