import axios from "axios";

import { createContext, ReactNode, useContext, useState } from "react";
// import { createLogger } from "vite-logger";
import chalk from "chalk";

type ProductsProviderProps = {
  children: ReactNode;
};

type Product = {
  id: number;
  name: string;
  price: number;
  amount_on_stock: number;
  image_url: string;
};
type ProductsContext = {
  searchProducts: (query: string) => void;
  products: Product[];
};

const ProductsContext = createContext({} as ProductsContext);

export function useProducts() {
  return useContext(ProductsContext);
}
export function ProductsProvider({ children }: ProductsProviderProps) {
  const [isLoading, setLoading] = useState<Boolean>(false);
  const [errorMSG, setError] = useState<String | undefined>("");
  const [products, setProducts] = useState<Product[]>([]);
  
  async function searchProducts(query: string) {
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:9000/api/v1/product");
      setError(undefined);
      setLoading(false);
      setProducts(response.data);
    } catch (error) {
      setError(String(error));
      // chalk.red.bold(`Erroraco aqui`);
      setLoading(false);
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        searchProducts,
        products,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
