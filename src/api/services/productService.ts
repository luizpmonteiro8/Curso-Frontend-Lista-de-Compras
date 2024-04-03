import { Pagination, PaginationParams } from "../model/pagination";
import { Product } from "../model/product";
import { categoryService } from "./categoryService";

//file to base64
const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

//base64 to arrayBuffer
const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const base64WithoutHeader = base64.replace(/^data:image\/[a-z]+;base64,/, "");

  const binaryString = atob(base64WithoutHeader);
  const length = binaryString.length;

  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Retorna o buffer contendo os bytes
  return bytes.buffer;
};

interface Results {
  results: Product[];
  pagination: Pagination;
}

const initialProductData: Product[] = [
  {
    id: 1,
    name: "Maça",
    image: "pexels-mali-maeder-102104.jpg",
    categoryId: 1,
  },
  {
    id: 2,
    name: "Carne",
    image: "pexels-lukas-618773.jpg",
    categoryId: 2,
  },
  {
    id: 3,
    name: "Frango",
    image: "pexels-lukas-616354.jpg",
    categoryId: 2,
  },
  {
    id: 4,
    name: "Biscoito caseiro",
    image: "pexels-pixabay-266706.jpg",
    categoryId: 3,
  },
  {
    id: 5,
    name: "Sabonete",
    image: "pexels-cup-of-couple-6962871.jpg",
    categoryId: 4,
  },
  {
    id: 6,
    name: "Arroz",
    image: "pexels-polina-tankilevitch-4110251.jpg",
    categoryId: 5,
  },
];

const initializeProductData = async (): Promise<void> => {
  const existingData = localStorage.getItem("productData");
  if (!existingData) {
    try {
      localStorage.setItem("productData", JSON.stringify(initialProductData));
    } catch (error) {
      console.error("Error initializing product data:", error);
      throw error;
    }
  }
};

initializeProductData();

const getProductDataFromLocalStorage = (): Product[] => {
  const productDataStr = localStorage.getItem("productData");
  return productDataStr ? JSON.parse(productDataStr) : [];
};

const saveProductDataToLocalStorage = (data: Product[]): void => {
  localStorage.setItem("productData", JSON.stringify(data));
};

export const productService = {
  paginationProduct: async (params?: PaginationParams): Promise<Results> => {
    try {
      const productData = getProductDataFromLocalStorage();

      const page = params?.page || 1;
      const pageSize = params?.size || 10;

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const paginatedItems = productData.slice(startIndex, endIndex);

      //add image
      for (const product of paginatedItems) {
        if (product.image) {
          const file = await productService.serveImage(product.id!);
          if (file) {
            product.imageFile = file;
          }
        }
      }

      const paginationMock: Pagination = {
        page,
        length: productData.length,
        size: pageSize,
        lastPage: Math.ceil(productData.length / pageSize),
      };

      return {
        results: paginatedItems,
        pagination: paginationMock,
      };
    } catch (error) {
      console.error("Erro product pagination", error);
      throw error;
    }
  },

  getProductById: async (id: number): Promise<Product | undefined> => {
    try {
      const productData = getProductDataFromLocalStorage();
      const product = productData.find((p) => p.id === id);

      product?.categoryId &&
        (product.category = await categoryService.getCategoryById(
          product.categoryId
        ));

      return product;
    } catch (error) {
      console.error("Error product by ID:", error);
      throw error;
    }
  },

  serveImage: async (id: number): Promise<File | null> => {
    try {
      const productData = getProductDataFromLocalStorage();
      const product = productData.find((p) => p.id === id);

      let blob = new Blob();
      if (product && product.image && !product.image.includes("fakepath")) {
        const imagePath = `/img/${product.image}`;
        const response = await fetch(imagePath);

        if (response.ok) {
          blob = await response.blob();
        }
      } else if (product?.imageFile) {
        const arrayBuffer = base64ToArrayBuffer(product.imageFile as string);
        blob = new Blob([arrayBuffer], { type: "image/png" });
      }
      return blob && blob.size > 0 && product && product.image
        ? new File([blob], product.image, { type: "image/png" })
        : null;
    } catch (error) {
      console.error("Error: Image not found or server error.");
      throw error;
    }
  },

  createProduct: async (productData: Product): Promise<Product> => {
    try {
      const oldProductData = getProductDataFromLocalStorage();
      let imageBase64 = "";
      if (productData.imageFile) {
        imageBase64 = await convertFileToBase64(productData.imageFile as File);
      }

      const newProduct: Product = {
        ...productData,
        id: oldProductData.length + 1,
        imageFile: imageBase64 as unknown as File,
      };

      oldProductData.push(newProduct);
      saveProductDataToLocalStorage(oldProductData);
      return newProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  updateProduct: async (
    id: number,
    productData: Product
  ): Promise<Product | undefined> => {
    try {
      const oldProductData = getProductDataFromLocalStorage();

      const index = oldProductData.findIndex((p) => p.id === id);
      if (index !== -1) {
        oldProductData[index] = { id, ...productData };
        saveProductDataToLocalStorage(oldProductData);
        return oldProductData[index];
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  removeProduct: async (id: number): Promise<void> => {
    try {
      const oldProductData = getProductDataFromLocalStorage();
      const index = oldProductData.findIndex((p) => p.id === id);
      if (index !== -1) {
        oldProductData.splice(index, 1);
        saveProductDataToLocalStorage(oldProductData);
      }
    } catch (error) {
      console.error("Error removing product:", error);
      throw error;
    }
  },
};
